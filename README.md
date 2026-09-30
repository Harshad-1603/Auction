# The Source Auction — Host Edition v3

This is the simplified host-only version.

- No Firebase
- No room codes
- No student login
- No backend

The facilitator runs everything from one laptop/projector.

## Game flow

1. Landing page explains only the public rules — no scoring spoilers.
2. Auction 10 mystery sources, A–J.
3. Reveal intelligence in two stages.
4. Open a 90-second negotiation/trading round.
5. Record any agreed source sales or swaps.
6. Give groups 2 minutes to choose and rank only their Top 6.
7. Enter each group's six source letters.
8. Calculate scores and reveal the winner.
9. Only then show the model Top 6 and scoring logic.

## Top-6 model used for this teaching game

A → B → C → D → E → F

This stays hidden until the results screen.

## Scoring

Portfolio quality:
- A = 15
- B = 14
- C = 13
- D = 12
- E = 9
- F = 8
- G = 6
- H = 4
- I = 2
- J = 1


Cash:
- +1 point per $100 remaining
- maximum +5

Top-6 ranking:
- +2 for each model Top-6 source selected
- +1 for each source in its exact model position
- maximum ranking score = 18

## Hosting on GitHub Pages

Upload only these files to the root of the repository:

- index.html
- styles.css
- app.js
- README.md

Then:

Settings → Pages → Deploy from a branch → main → /(root)

After replacing an older version on GitHub, wait for Pages to redeploy and use a hard refresh:

- Windows: Ctrl + Shift + R
- Mac: Cmd + Shift + R

If GitHub is still showing an older cached page, open the live URL in a private/incognito window.

## v5 source-design change

All ten auction lots now answer the SAME narrow question:

"How effective is AI-assisted thermal imaging for early fault detection in solar PV panels?"

The lots deliberately look similar during bidding. Students must distinguish them using later evidence about:
- sample size,
- independence,
- peer review,
- methodology transparency,
- replication,
- commercial bias,
- and publication maturity.

The weaker sources are no longer obviously unrelated topics such as a general standard, Wikipedia overview, or news story.

## v6 mystery lot presentation

During the auction the projector no longer shows the real source title or publication type.

Every lot shows the SAME common research question and only four neutral evidence fields:
- year,
- amount/type of evidence,
- study setting,
- reported result.

The source identity, authorship/producer information and source type are revealed only later.

The JS and CSS filenames are now `app-v6.js` and `styles-v6.css` to avoid the browser serving an older cached GitHub Pages version.
