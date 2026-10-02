from pathlib import Path
from PIL import Image
import subprocess

root = Path(__file__).resolve().parents[1]
assets = root / 'public' / 'assets'
assets.mkdir(parents=True, exist_ok=True)
source = Image.open('/home/ubuntu/reference_inspect/1000117923.png').convert('RGB')
source.save(assets / 'reference.jpg', quality=92, optimize=True)

# Preserve the supplied appearance; crops only remove surrounding layout areas.
crops = {
    'hero-poster.jpg': (210, 0, 790, 650),
    'portrait-main.jpg': (380, 70, 790, 520),
    'portrait-detail.jpg': (445, 245, 650, 420),
    'portrait-about.jpg': (220, 600, 510, 910),
    'portrait-contact.jpg': (455, 1220, 790, 1536),
    'project-malware.jpg': (0, 610, 794, 825),
    'project-leaf.jpg': (0, 810, 794, 1040),
    'project-proxy.jpg': (0, 1030, 794, 1265),
    'library-01.jpg': (330, 1100, 430, 1240),
    'library-02.jpg': (430, 1100, 525, 1240),
    'library-03.jpg': (525, 1100, 620, 1240),
    'library-04.jpg': (620, 1100, 714, 1240),
}
for name, box in crops.items():
    image = source.crop(box)
    image.thumbnail((1600, 1200), Image.Resampling.LANCZOS)
    image.save(assets / name, quality=90, optimize=True)

# The reference package has no MP4. Create a subtle motion fallback from the supplied visual,
# keeping the original pixels undistorted while giving the hero a true video layer.
subprocess.run([
    'ffmpeg', '-y', '-loop', '1', '-i', str(assets / 'hero-poster.jpg'),
    '-vf', "scale=1920:-2,crop=1920:1080,zoompan=z='min(zoom+0.00020,1.05)':d=300:s=1920x1080:fps=30,format=yuv420p",
    '-t', '10', '-an', '-movflags', '+faststart', str(assets / 'hero.mp4')
], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
