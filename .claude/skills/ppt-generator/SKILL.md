---
name: ppt-generator
description: >
  Generates complete PowerPoint (.pptx) presentation files from a topic, target audience, and desired length.
  Each slide gets a title, a single focused key message, and detailed visual asset instructions.
  Ends with an actionable self-review checklist.
  
  TRIGGER this skill whenever the user wants to create a presentation, slideshow, or deck — even if they don't say "PPT" explicitly. Common triggers include: "make a PPT", "create a presentation", "build a slide deck", "generate slides", "I need a deck on X", "prepare presentation materials", "make slides for my talk", "put together a slideshow", "I have to present on X", "help me build a deck". Also trigger when the user has a topic and an audience and seems to be preparing to present.
---

# PPT Generator

You create professional PowerPoint presentations as `.pptx` files.

## Step 1: Gather inputs

You need three things. Extract them from the user's message if present; ask for only what's missing.

| Input | What to ask |
|-------|-------------|
| **Topic** | What is the presentation about? Any specific angle or goal? |
| **Target audience** | Who will be in the room? (e.g., executives, engineers, students, clients) |
| **Length** | How many slides, or how many minutes? (1 min ≈ 1–2 slides) |

Once you have all three, proceed — don't ask for more.

## Step 2: Design the slide structure

Plan the full slide sequence before writing anything. A good deck has:

- **Title slide** — topic, presenter context, date (if relevant)
- **Agenda / Overview** — what the audience will learn (skip for very short decks ≤5 slides)
- **Body slides** — one idea per slide, logically ordered
- **Conclusion / Summary** — restate the key takeaways
- **Call-to-action or Next Steps** — what you want the audience to do

Tailor depth and vocabulary to the audience. Executives want the bottom line first; engineers want the mechanism; students need context before details.

## Step 3: Write each slide

For every slide, produce:

```
## Slide N: [Title]
**Key message:** One sentence — the single thing the audience must take away from this slide.
**Visual:** Specific instruction for what to show (e.g., "Bar chart comparing Q1–Q4 revenue with a trend line", "Photo of a diverse team in a modern office", "Simple 3-column diagram: Input → Process → Output"). Be concrete enough that a designer could act on it without asking questions.
**Speaker notes (optional):** 1–2 sentences of context the presenter should say aloud but not show on screen.
```

## Step 4: Generate the .pptx file

Use the bundled script to produce the file. First, ensure python-pptx is installed:

```bash
pip show python-pptx > /dev/null 2>&1 || pip install python-pptx -q
```

Then build a JSON payload and pass it to the script:

```bash
python /Users/seol/.claude/skills/ppt-generator/scripts/generate_pptx.py '<json>' '<output_path>'
```

**JSON schema:**

```json
{
  "title": "Presentation Title",
  "author": "Author Name",
  "slides": [
    {
      "title": "Slide Title",
      "key_message": "The one thing to take away.",
      "visual": "Description of the visual asset.",
      "notes": "Optional speaker notes."
    }
  ]
}
```

Name the output file descriptively, e.g., `ai_strategy_for_executives.pptx`, and save it in the current working directory.

Tell the user the full path to the file once it's created.

## Step 5: Self-review checklist

After generating the file, print this checklist and mark each item as ✅ pass or ⚠️ needs attention, with a one-line note:

```
### Self-Review Checklist

**Clarity of key messages**
- [ ] Every slide has exactly one key message (no slide tries to say two things)
- [ ] Key messages are written in plain language the audience will understand without help

**Audience appropriateness**
- [ ] Vocabulary and depth match the stated audience
- [ ] Jargon is either avoided or defined on first use
- [ ] The opening slide immediately answers "why should I care?" for this audience

**Visual consistency**
- [ ] Every slide has a concrete visual instruction (not vague like "add a graphic")
- [ ] Visuals reinforce the key message rather than decorate the slide

**Logical flow**
- [ ] Slides follow a clear narrative arc (problem → insight → solution, or similar)
- [ ] Each slide connects naturally to the next
- [ ] No slide could be removed without losing something important

**Call to action**
- [ ] The final slide tells the audience what to do, decide, or remember next
- [ ] The CTA is specific and achievable
```

Be honest in the checklist — if something is genuinely weak, flag it and suggest a fix.
