# 🎨 How to Generate Images in Batch Using KEI AI

## 📋 Method 1: Using KEI AI Interface (If Available)

### Step-by-Step Instructions:

1. **Log into KEI AI**
   - Go to your KEI AI dashboard
   - Navigate to the image generation section

2. **Check for Batch Feature**
   - Look for a "Batch" or "Multiple Prompts" option
   - Some AI tools allow you to paste multiple prompts separated by line breaks or special characters

3. **If Batch Feature Exists:**
   ```
   - Paste all prompts from ALL_PROMPTS_COPY_PASTE.md
   - Separate each prompt with a new line or |||
   - Select number of images per prompt (usually 1)
   - Click "Generate All" or similar button
   ```

---

## 📋 Method 2: Sequential Generation (Most Common)

Since KEI AI may not have a built-in batch feature, here's the most efficient way:

### Quick Sequential Method:

1. **Prepare Your Prompts**
   - Open `ALL_PROMPTS_COPY_PASTE.md`
   - Have it ready in a separate window

2. **Generate One Industry at a Time**
   - Copy all 8 prompts for one industry (e.g., E-commerce)
   - Generate them one by one quickly:
     - Paste prompt → Generate → Download
     - Paste next prompt → Generate → Download
     - Repeat for all 8

3. **Time-Saving Tips:**
   - Keep the prompts file open
   - Use keyboard shortcuts (Ctrl+V to paste)
   - Download images immediately after generation
   - Don't wait for each to finish before starting the next

### Estimated Time:
- **Per image:** 2-3 minutes
- **8 images:** 16-24 minutes per industry
- **Total:** ~2 hours for all 40 images

---

## 📋 Method 3: Using KEI AI API (Advanced)

If KEI AI offers an API, you can automate batch generation:

### Python Script Example:

```python
import requests
import time
import json

# Your KEI AI API endpoint and key
API_URL = "https://api.kei.ai/v1/generate"  # Replace with actual endpoint
API_KEY = "your-api-key-here"

# Load prompts from file
prompts = [
    "Modern infographic showing 70% cart abandonment rate...",
    "Infographic showing 3x cost increase...",
    # ... add all prompts here
]

# File names for each image
file_names = [
    "ecom1.png",
    "ecom2.png",
    # ... add all file names
]

def generate_image(prompt, filename):
    """Generate a single image"""
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }
    
    payload = {
        "prompt": prompt,
        "quality": "high",
        "resolution": "4K"
    }
    
    try:
        response = requests.post(API_URL, json=payload, headers=headers)
        response.raise_for_status()
        
        # Save the image
        with open(f"images/{filename}", "wb") as f:
            f.write(response.content)
        
        print(f"✅ Generated: {filename}")
        return True
    except Exception as e:
        print(f"❌ Error generating {filename}: {e}")
        return False

# Generate all images
print("Starting batch generation...")
for i, (prompt, filename) in enumerate(zip(prompts, file_names), 1):
    print(f"\n[{i}/{len(prompts)}] Generating {filename}...")
    generate_image(prompt, filename)
    
    # Small delay to avoid rate limiting
    time.sleep(2)

print("\n🎉 Batch generation complete!")
```

### To Use This Script:

1. **Get API Credentials**
   - Check KEI AI dashboard for API key
   - Find API endpoint documentation

2. **Install Requirements**
   ```bash
   pip install requests
   ```

3. **Create Script**
   - Copy the script above
   - Add all prompts from `ALL_PROMPTS_COPY_PASTE.md`
   - Add all file names
   - Update API_URL and API_KEY

4. **Run Script**
   ```bash
   python batch_generate.py
   ```

---

## 📋 Method 4: Browser Automation (Semi-Automated)

Use browser automation tools to speed up manual generation:

### Using Browser Extensions:

1. **Install AutoFill Extension**
   - Use extensions like "AutoFill Forms" or "Text Blaze"
   - Create templates for each prompt

2. **Create Keyboard Macros**
   - Use tools like AutoHotkey (Windows) or Keyboard Maestro (Mac)
   - Create shortcuts to paste prompts quickly

### Simple Browser Script (JavaScript):

```javascript
// Run this in browser console on KEI AI page
const prompts = [
    "Modern infographic showing 70% cart abandonment rate...",
    // ... add all prompts
];

let currentIndex = 0;

function fillNextPrompt() {
    if (currentIndex >= prompts.length) {
        console.log("✅ All prompts filled!");
        return;
    }
    
    // Find the prompt input field (adjust selector based on KEI AI's interface)
    const input = document.querySelector('textarea[placeholder*="prompt"], input[type="text"]');
    
    if (input) {
        input.value = prompts[currentIndex];
        input.dispatchEvent(new Event('input', { bubbles: true }));
        console.log(`Filled prompt ${currentIndex + 1}/${prompts.length}`);
        currentIndex++;
    }
}

// Run this function for each prompt
fillNextPrompt();
```

---

## 🚀 RECOMMENDED APPROACH: Hybrid Method

**Best balance of speed and control:**

### Step 1: Generate Core Assets First (5 images)
- Start with hero image, dashboard, integration visual
- These are most important
- Takes ~15 minutes

### Step 2: Generate One Industry Fully (8 images)
- Pick E-commerce (most used)
- Generate all 8 images
- Review quality
- Takes ~20 minutes

### Step 3: Adjust if Needed
- If quality is good, continue with same approach
- If quality needs improvement, adjust prompts

### Step 4: Continue with Remaining Industries
- Finance (8 images) - ~20 min
- Healthcare (8 images) - ~20 min
- Real Estate (8 images) - ~20 min

### Step 5: Generate How It Works (3 images)
- Final 3 images
- Takes ~10 minutes

### Step 6: Generate Videos Separately
- Hero video - ~10 min
- Demo video - ~15 min

**Total Time: ~2 hours**

---

## 💡 PRO TIPS FOR EFFICIENCY

### 1. **Use Multiple Tabs**
- Open KEI AI in 2-3 browser tabs
- Generate different images simultaneously
- Maximize your time

### 2. **Prepare Everything First**
- Have all prompts ready in `ALL_PROMPTS_COPY_PASTE.md`
- Create folder structure for images
- Name files before downloading

### 3. **Use Clipboard Manager**
- Tools like Ditto (Windows) or CopyClip (Mac)
- Keep multiple prompts in clipboard history
- Quick access to paste

### 4. **Set Up Workspace**
```
📁 images/
  📁 ecommerce/
  📁 finance/
  📁 healthcare/
  📁 real-estate/
  📁 core/
  📁 how-it-works/
```

### 5. **Batch Download**
- Generate multiple images
- Download all at once
- Organize later

---

## 🔍 Finding KEI AI's Batch Feature

### Check These Locations:

1. **Dashboard Menu**
   - Look for "Batch", "Bulk", or "Multiple" options
   - Check settings/preferences

2. **Image Generation Page**
   - Look for "Add More Prompts" button
   - Check for "Batch Mode" toggle
   - Look for import/upload option

3. **Documentation**
   - Check KEI AI help/docs
   - Search for "batch" or "bulk"
   - Contact support if needed

4. **API Documentation**
   - If API exists, check for batch endpoints
   - Look for rate limits and quotas

---

## 📱 Mobile/App Method

If KEI AI has a mobile app:

1. **Use Mobile for Quick Reviews**
   - Generate on desktop
   - Review on mobile while next generates

2. **Multi-Device**
   - Generate on multiple devices simultaneously
   - Use different accounts if allowed

---

## ⚡ Quick Start Checklist

- [ ] Open `ALL_PROMPTS_COPY_PASTE.md`
- [ ] Log into KEI AI
- [ ] Check for batch feature
- [ ] If yes → Use Method 1
- [ ] If no → Use Method 2 (Sequential)
- [ ] Create image folders
- [ ] Start with Core Assets (5 images)
- [ ] Generate E-commerce batch (8 images)
- [ ] Review quality
- [ ] Continue with remaining batches
- [ ] Generate videos separately
- [ ] Optimize images for web
- [ ] Test on website

---

## 🆘 Troubleshooting

### If Generation is Slow:
- Generate during off-peak hours
- Use lower quality for drafts, upgrade later
- Generate in smaller batches

### If Quality Varies:
- Use consistent style keywords
- Copy successful prompts and modify
- Generate 2-3 variations, pick best

### If Credits Running Low:
- Prioritize high-priority images first
- Skip optional images if needed
- Generate videos last (most expensive)

---

## 📞 Need Help?

1. **Check KEI AI Documentation**
   - Look for batch generation guides
   - Check FAQ section

2. **Contact KEI AI Support**
   - Ask about batch features
   - Request API access if needed

3. **Use Alternative Methods**
   - Try API if available
   - Use browser automation
   - Generate sequentially but efficiently

---

**Remember:** Even without a batch feature, you can generate all 40 images in ~2 hours using the sequential method. Just stay organized and work through one industry at a time! 🚀
