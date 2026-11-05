# Issue Essay Writer

Write the Analyze an Issue essay in 30 minutes, with original prompts, a planning space and feedback.

Part of the [GRE and TOEFL Study Suite](https://github.com/Apurba94/gre-toefl-study-suite): 100 free study apps for the GRE General Test and more. It works offline, as a Windows program or in the browser.

## Download and run

- **Windows:** download `Issue Essay Writer.exe` from the [latest release](https://github.com/Apurba94/gre-issue-writer/releases/latest) and open it. Nothing to install. It opens in its own window and saves your progress in your user folder.
- **Browser:** open it online in the suite's web edition at https://gre-toefl-study-suite.vercel.app/apps/gre-issue-writer/ . Progress stays in that browser.
- **From source:** `python launcher.py` (Python 3.10 or later, no packages needed).

## What it does

The GRE has one essay task since September 2023: Analyze an Issue, in 30 minutes. This app gives you 40 original Issue prompts in six instruction styles, a 30-minute timer, a plain editor without spell check (as on the test), and feedback on length, structure and style.

Sections: Write, Prompts, History, Progress, About.

## How to use it

1. Press **New prompt** in **Write**, or pick one in **Prompts**.
2. Start the timer. Spend about 5 minutes planning, 22 writing and 3 checking.
3. Press **Get feedback**, then work through the checklist honestly.
4. See your past essays in **History**.

## Good to know

- All questions, passages and definitions were written for this suite. None are official ETS questions. For official practice, use the materials on ets.org.
- It follows the GRE General Test as shortened in September 2023 and the TOEFL iBT as updated in January 2026. Formats change, so check ets.org before your test.
- Feedback on writing and speaking counts things a program can count honestly, such as length and linking words. It does not give an official score.
- Not endorsed by or affiliated with ETS. GRE and TOEFL are registered trademarks of ETS.

## For developers

The app is plain HTML and JavaScript in `web/`, run by a small Python launcher that serves it on 127.0.0.1 only and needs a secret token for saving. Tests: `node --test "tests/*.test.js"` (23 tests) and `python -m unittest discover -s tests`. Build the .exe with `python build_exe.py`.

Built with AI assistance (Claude Code). MIT licence. By JANIN A APURBA.
