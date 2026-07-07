import os
from PIL import Image

input_path = 'public/ChatGPT Image Jul 8, 2026, 02_35_40 AM.png'
output_path = 'public/og-image.jpg'

try:
    with Image.open(input_path) as img:
        # Convert to RGB if it's RGBA
        if img.mode == 'RGBA':
            background = Image.new('RGB', img.size, (255, 255, 255))
            background.paste(img, mask=img.split()[3])
            img = background
        elif img.mode != 'RGB':
            img = img.convert('RGB')
        
        # Resize if width > 1200
        if img.width > 1200:
            ratio = 1200.0 / img.width
            new_height = int(img.height * ratio)
            img = img.resize((1200, new_height), Image.Resampling.LANCZOS)
        
        img.save(output_path, 'JPEG', quality=80)
        print(f"Saved {output_path}. Size: {os.path.getsize(output_path)} bytes")
except Exception as e:
    print("Error:", e)
