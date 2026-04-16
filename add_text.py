from PIL import Image, ImageDraw, ImageFont
import os

# Configuration
base_path = "/Users/vickyadifirmansyah/Documents/Projects/rolex/public/sequence/"
start_frame = 7
end_frame = 29
text = "Descend with confidence"
font_path = "/Users/vickyadifirmansyah/Documents/Projects/rolex/node_modules/.pnpm/next@16.2.4_@babel+core@7.29.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/@vercel/og/Geist-Regular.ttf"
font_size = 60

# Positioning
# Image size is 2048 x 1152
# Right side: x around 1400
# Bottom to top: y from 900 down to 300

start_y = 900
end_y = 500
x_pos = 1400

total_frames = end_frame - start_frame
y_step = (start_y - end_y) / total_frames

try:
    font = ImageFont.truetype(font_path, font_size)
except Exception as e:
    print(f"Font loading failed: {e}. Using default font.")
    font = ImageFont.load_default()

for i in range(start_frame, end_frame + 1):
    frame_name = f"frame-{i:03d}.jpg"
    file_path = os.path.join(base_path, frame_name)

    if not os.path.exists(file_path):
        print(f"Skipping {frame_name}: file not found.")
        continue

    img = Image.open(file_path)
    draw = ImageDraw.Draw(img)

    # Calculate current y position
    current_y = start_y - (y_step * (i - start_frame))

    # Draw text
    draw.text((x_pos, current_y), text, font=font, fill="white")

    # Save back to the same path
    img.save(file_path)
    print(f"Processed {frame_name} at y={current_y:.1f}")

print("Done!")
