# Menu Setup Guide

## For Restaurant Owner

### Step 1: Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Click **Blank** to create new spreadsheet
3. Rename the sheet to **Menu**

### Step 2: Set Up Column Headers

In row 1, create these columns:

| A | B | C | D | E | F | G | H | I | J | K |
|---|---|---|---|---|---|---|---|---|---|---|
| category | NAME_EN | NAME_FI | NAME_SV | NAME_TH | DESC_EN | DESC_FI | DESC_SV | DESC_TH | PRICE | SPICE_LEVEL |

- **category**:Menu items,image_url,SIGNATURE
- **NAME_X**: Dish name in language X (EN, FI, SV, DE)
- **DESC_X**: Description in language X
- **PRICE**: Price in euros (e.g., 15.50)
- **SPICE_LEVEL**: 0-3 (0=no spice, 3=very spicy)
- **image_url**: Optional URL to dish image
- **SIGNATURE**: true/false for signature dishes

### Step 3: Add Menu Items

Example rows:

| category | NAME_EN | NAME_FI | NAME_SV | DESC_EN | DESC_FI | PRICE | SPICE_LEVEL |
|----------|---------|---------|---------|---------|---------|-------|-------------|
| Appetizers | Spring Rolls | Lumpia | Frityra | Crispy vegetable rolls | Rapeakasviset | 8.50 | 1 |
| Main Courses | Pad Thai | Pad Thai | Pad Thai | Stir-fried rice noodles | Wokattu riisinuudeli | 16.00 | 2 |
| Main Courses | Green Curry | Vihreä curry | Grön curry | Coconut curry with vegetables | Kookoskurry kasviksilla | 17.00 | 3 |

### Step 4: Publish Sheet

1. Click **File → Share → Publish to web**
2. Select **Comma-separated values (.csv)**
3. Click **Publish**
4. Copy the link URL

### Step 5: Update Your Site

Send the published link to your developer, or:
1. Edit `src/lib/utility.ts`
2. Find `googleSheetsMenuUrl`
3. Replace with your new link

---

## Supported Languages

- **EN** = English (default)
- **FI** = Finnish
- **SV** = Swedish
- **TH** = Thai (4th language ready!)

Add new columns with `NAME_TH`, `DESC_TH` for Thai.