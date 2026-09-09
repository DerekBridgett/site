"""
Photo prep for the proof-of-service gallery.

Usage:  python3 scripts/prep-photos.py <source-folder>
Output: public/proof/<slug>.webp  (1600px long edge, EXIF/GPS stripped)

Edit MANIFEST to rename/caption photos and BLUR to redact anything
(house numbers, plates) before it goes public. Coordinates are in
ORIGINAL pixel space (x1, y1, x2, y2).
"""
import sys, os
from PIL import Image, ImageOps, ImageFilter

MAX_EDGE = 1600
OUT = os.path.join(os.path.dirname(__file__), "..", "public", "proof")

# original filename -> output slug
MANIFEST = {
    "IMG_0818.jpeg": "paver-border-annuals-01",
    "IMG_0819.jpeg": "paver-border-annuals-02",
    "IMG_0822.jpeg": "backyard-bed-gravel-01",
    "IMG_0823.jpeg": "bougainvillea-patio",
    "IMG_0824.jpeg": "backyard-bed-gravel-02",
    "IMG_0944.jpeg": "valve-box-service",
    "IMG_0953.jpeg": "pump-test-run",
    "IMG_0956.jpeg": "everbilt-pump-install",
    "IMG_0990.jpeg": "sprinkler-head-coverage",
    "IMG_0991.jpeg": "trench-mainline-01",
    "IMG_0993.jpeg": "trench-mainline-02",
    "IMG_0994.jpeg": "trench-mainline-03",
    "IMG_0995.jpeg": "trench-mainline-04",
    "IMG_0996.jpeg": "trench-mainline-05",
    "IMG_0997.jpeg": "trench-mainline-06",
    "IMG_1196.jpeg": "pump-plumbing-detail",
    "IMG_1199.jpeg": "goulds-pump-rebuild",
    "IMG_1270.jpeg": "fence-line-zone-test-01",
    "IMG_1272.jpeg": "fence-line-zone-test-02",
}

# original filename -> list of boxes to blur (original pixel coords)
BLUR = {
    "IMG_0818.jpeg": [(650, 110, 770, 170), (595, 335, 665, 395)],  # house number, plate
}

def prep(src_dir):
    os.makedirs(OUT, exist_ok=True)
    for name, slug in MANIFEST.items():
        path = os.path.join(src_dir, name)
        if not os.path.exists(path):
            print("skip (missing):", name); continue
        im = ImageOps.exif_transpose(Image.open(path)).convert("RGB")
        for box in BLUR.get(name, []):
            region = im.crop(box).filter(ImageFilter.GaussianBlur(18))
            im.paste(region, box[:2])
        im.thumbnail((MAX_EDGE, MAX_EDGE), Image.LANCZOS)
        out = os.path.join(OUT, slug + ".webp")
        im.save(out, "WEBP", quality=82, method=6)   # no exif passed -> stripped
        print(f"{name} -> {slug}.webp {im.size}")

if __name__ == "__main__":
    prep(sys.argv[1] if len(sys.argv) > 1 else ".")
