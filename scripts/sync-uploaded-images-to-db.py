import os
import json
import subprocess

def main():
    conn_cmd = [
        "mysql",
        "-u", "u618910819_deepamtextile",
        "-pRIYA@lovesdad143",
        "u618910819_deepamtextile",
        "-B", "-N",
        "-e", "SELECT slug, galleryImages, heroImage, cardImage FROM ProductCategory;"
    ]
    out = subprocess.check_output(conn_cmd).decode("utf-8")

    base_dir = "/home/u618910819/domains/deepamtextiles.com/uploads-data/products"
    sql_statements = []

    for line in out.strip().split("\n"):
        if not line:
            continue
        parts = line.split("\t")
        slug = parts[0]
        db_gallery = json.loads(parts[1]) if len(parts) > 1 and parts[1] else []
        hero = parts[2] if len(parts) > 2 else ""
        card = parts[3] if len(parts) > 3 else ""

        cat_dir = os.path.join(base_dir, slug)
        disk_files = []
        if os.path.isdir(cat_dir):
            files = [f for f in os.listdir(cat_dir) if f.lower().endswith((".jpg", ".jpeg", ".png", ".webp"))]
            files.sort(key=lambda f: os.path.getmtime(os.path.join(cat_dir, f)))
            disk_files = [f"/uploads/products/{slug}/{f}" for f in files]

        merged = []
        seen = set()
        for img in db_gallery:
            if img.startswith("/uploads/") and img not in seen:
                seen.add(img)
                merged.append(img)
        for img in disk_files:
            if img not in seen:
                seen.add(img)
                merged.append(img)

        new_hero = hero
        if (not new_hero or not new_hero.startswith("/uploads/")) and merged:
            new_hero = merged[-1]
        new_card = card
        if (not new_card or not new_card.startswith("/uploads/")) and merged:
            new_card = merged[0]

        print(f"{slug:20}: DB had {len(db_gallery)}, disk has {len(disk_files)}, merged total: {len(merged)}")

        if merged:
            gallery_json = json.dumps(merged)
            escaped_gallery = json.dumps(gallery_json)
            escaped_hero = json.dumps(new_hero)
            escaped_card = json.dumps(new_card)
            escaped_slug = json.dumps(slug)
            stmt = f"UPDATE ProductCategory SET galleryImages = {escaped_gallery}, heroImage = {escaped_hero}, cardImage = {escaped_card}, updatedAt = NOW() WHERE slug = {escaped_slug};"
            sql_statements.append(stmt)

    with open("/tmp/sync_images.sql", "w") as f:
        f.write("\n".join(sql_statements) + "\n")
    print(f"Generated {len(sql_statements)} SQL update statements.")

    apply_cmd = [
        "mysql",
        "-u", "u618910819_deepamtextile",
        "-pRIYA@lovesdad143",
        "u618910819_deepamtextile"
    ]
    with open("/tmp/sync_images.sql", "rb") as sql_in:
        subprocess.check_call(apply_cmd, stdin=sql_in)
    print("Successfully applied updates to MySQL!")

if __name__ == "__main__":
    main()

