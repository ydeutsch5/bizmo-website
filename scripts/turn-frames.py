"""
Builds the Act I "turn" image sequence from the studio stills (C1.png .. C37.png, 3840x3840 RGBA,
one still every 5 degrees of the flip). One device per frame, always.

    python3 scripts/turn-frames.py <folder with C1.png..C37.png>

Writes public/film/{lg,sm}/turn/0000.webp .. 0144.webp and the two turn stills.

How it works
- In-between poses are made by warping the nearest still onto the in-between outline. Only in the
  first few degrees (the hero), where two stills line up exactly, are the two neighbours mixed.
- The stills flip the device over its long axis, which would leave the back upside down. From the
  edge-on still onwards the stills are rotated half a turn, so the back ends upright and lines up
  with the first frame of the explode clip.
- Timing: frames 0-52 (clip time 0-0.36, the hero) cover only the first 17 degrees; the rest of the
  flip plays over frames 52-144.
- The backdrop is taken from the explode clip's first frame with the device painted out.
"""
import sys, os
import numpy as np, cv2

SRC = sys.argv[1]
ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
OUT = os.path.join(ROOT, "public", "film")
N = 145
HERO_END, HERO_POSE = 52, 3.5      # frame, pose (in stills) where the hero range ends
MIX_UNTIL = 4                      # below this pose the face is near flat-on and two stills line up exactly
EDGE = 18                          # index of the edge-on still (C19)
BOX = (371.5, 144, 1226.5, 700)    # device box on the 1600x900 frame, as in the other clips
SS = 2                             # supersample

def load(i):
    im = cv2.imread(os.path.join(SRC, f"C{i + 1}.png"), cv2.IMREAD_UNCHANGED)
    im = cv2.resize(im, (1920, 1920), interpolation=cv2.INTER_AREA).astype(np.float32) / 255
    if i >= EDGE:
        im = im[::-1, ::-1].copy()
    im[..., :3] *= im[..., 3:4]    # premultiplied
    return im

def quad(im):
    """Outline of the device as a trapezoid: TL, TR, BR, BL."""
    a = im[..., 3] > 0.5
    rows = np.where(a.any(axis=1))[0]
    y0, y1 = rows[0], rows[-1]
    h = y1 - y0
    def ext(y):
        xs = np.where(a[int(round(y))])[0]
        return xs[0], xs[-1]
    ya, yb = y0 + 0.2 * h, y1 - 0.2 * h
    (la, ra), (lb, rb) = ext(ya), ext(yb)
    def at(y, va, vb):
        return va + (vb - va) * (y - ya) / max(yb - ya, 1e-6)
    return np.float32([[at(y0, la, lb), y0], [at(y0, ra, rb), y0], [at(y1, ra, rb), y1 + 1], [at(y1, la, lb), y1 + 1]])

stills = [load(i) for i in range(37)]
quads = [quad(s) for s in stills]

# scale and offset from the 1920 still to the supersampled lg canvas, set by the flat back still
q = quads[36]
k = (BOX[2] - BOX[0]) * SS / (q[1][0] - q[0][0] + 1)
cx, cy = (BOX[0] + BOX[2]) / 2 * SS, (BOX[1] + BOX[3]) / 2 * SS
ox, oy = cx - k * (q[0][0] + q[1][0] + 1) / 2, cy - k * (q[0][1] + q[2][1]) / 2
to_canvas = lambda Q: np.float32([[x * k + ox, y * k + oy] for x, y in Q])

# backdrop: explode's first frame, device region replaced by a smooth fit of the surroundings
plate = cv2.imread(os.path.join(OUT, "lg", "explode", "0000.webp")).astype(np.float32)
H, W = plate.shape[:2]
yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
u, v = xx / W * 2 - 1, yy / H * 2 - 1
terms = np.stack([u**i * v**j for i in range(7) for j in range(7) if i + j <= 6], -1)
hole = (xx > BOX[0] - 26) & (xx < BOX[2] + 26) & (yy > BOX[1] - 26) & (yy < BOX[3] + 26)
fit = np.zeros_like(plate)
for c in range(3):
    coef, *_ = np.linalg.lstsq(terms[~hole][::7], plate[..., c][~hole][::7], rcond=None)
    fit[..., c] = terms @ coef
m = cv2.GaussianBlur(hole.astype(np.float32), (0, 0), 14)[..., None]
m = np.clip(m * 1.6, 0, 1)
plate = plate * (1 - m) + fit * m
plate = cv2.resize(plate, (W * SS, H * SS), interpolation=cv2.INTER_CUBIC)

def pose(f):
    if f <= HERO_END:
        return HERO_POSE * f / HERO_END
    t = (f - HERO_END) / (N - 1 - HERO_END)
    return HERO_POSE + (36 - HERO_POSE) * (0.25 * t + 0.75 * (3 * t * t - 2 * t**3))

def render(p):
    i = min(int(np.floor(p)), 35)
    a = p - i
    T = to_canvas(quads[i] * (1 - a) + quads[i + 1] * a)
    size = (W * SS, H * SS)
    warp = lambda j: cv2.warpPerspective(stills[j], cv2.getPerspectiveTransform(quads[j], T), size, flags=cv2.INTER_LINEAR)
    if abs(p - EDGE) <= 2.5:
        j = int(round(p))                     # near edge-on the outline is the side of the body, not a face:
        T = to_canvas(quads[j])               # show the nearest still as it is, never stretched
        dev = warp(j)
    elif p >= MIX_UNTIL:
        dev = warp(i if a < 0.5 else i + 1)   # steep poses: the nearer still only, never a mix
    elif a < 1e-4:
        dev = warp(i)
    else:
        w = a * a * (3 - 2 * a)
        dev = warp(i) * (1 - w) + warp(i + 1) * w
    out = plate * (1 - dev[..., 3:4]) + dev[..., :3] * 255
    return np.clip(out, 0, 255)

rng = np.random.default_rng(7)
for name, w in (("lg", 1600), ("sm", 960)):
    os.makedirs(os.path.join(OUT, name, "turn"), exist_ok=True)
for f in range(N):
    full = render(pose(f))
    for name, w in (("lg", 1600), ("sm", 960)):
        h = round(w * H / W)
        im = cv2.resize(full, (w, h), interpolation=cv2.INTER_AREA)
        im = np.clip(im + rng.uniform(-0.5, 0.5, im.shape), 0, 255).astype(np.uint8)
        cv2.imwrite(os.path.join(OUT, name, "turn", f"{f:04d}.webp"), im, [cv2.IMWRITE_WEBP_QUALITY, 74 if name == "lg" else 72])
        if name == "lg" and f in (0, N - 1):
            cv2.imwrite(os.path.join(OUT, "stills", f"turn-{'first' if f == 0 else 'last'}.webp"), im, [cv2.IMWRITE_WEBP_QUALITY, 82])
print("turn:", N, "frames")
