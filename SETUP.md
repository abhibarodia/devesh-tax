# Devesh Tax Services — Setup Guide

Follow these steps in order. Expect 3–5 hours total.

---

## 1. Deploy the static site to GitHub Pages

1. Commit all files to your repo (e.g. `DeveshTaxReturns`).
2. Repo → **Settings → Pages**.
3. Source: **Deploy from a branch** → Branch: `main` → Folder: `/ (root)` → **Save**.
4. Wait 1–2 minutes. Visit `https://<username>.github.io/<repo>/`.
5. If you use the exact URLs above, no `base href` changes are needed. For a custom repo name, update `sitemap.xml` and `robots.txt` URLs.

---

## 2. Fill in `assets/js/config.js`

Open the file in any text editor and update:

- `BUSINESS_NAME`, `OWNER_NAME`, `OWNER_CREDENTIAL`, `OWNER_BIO`
- `SERVICE_AREA`, `HOURS`, `LANGUAGES`
- `EMAIL`, `PHONE`
- `SIMPLE_FEE`, `FEE_EXCLUSIONS`, `E_TRANSFER_EMAIL`
- `PRIVACY_OFFICER_NAME`, `RETENTION_YEARS`, `LAST_UPDATED`

Leave `NEW_CLIENT_FORM_EMBED` and `RETURNING_CLIENT_FORM_EMBED` as `YOUR_...` for now — they're set in step 4.

---

## 3. Build the two Google Forms

### Form 1 — New Client Intake

Create a new Google Form titled **"Devesh Tax Services — 2025 New Client Intake"**.

Add these questions **in this exact order** (order matters for reporting):

| # | Question text | Type | Required | Validation / Options |
|---|---|---|---|---|
| 1 | Email address | Short answer | ✅ | Regex: `\S+@\S+\.\S+` |
| 2 | First name (as per SIN) | Short answer | ✅ | |
| 3 | Surname (as per SIN) | Short answer | ✅ | |
| 4 | Phone number | Short answer | ✅ | |
| 5 | Date of birth | Date | ✅ | |
| 6 | Mailing address | Paragraph | ✅ | |
| 7 | Arrival date in Canada | Date | ❌ | Description: "Leave blank if you were born in Canada." |
| 8 | Marital status | Dropdown | ✅ | Single, Married, Common-law, Divorced, Widowed, Separated |
| 9 | Spouse name (if married) | Short answer | ❌ | Description: "Only if married or common-law." |
| 10 | Is your spouse in Canada? | Multiple choice | ❌ | Yes, No |
| 11 | Spouse arrival date (if in Canada) | Date | ❌ | |
| 12 | Province of residence on Dec 31, 2025 | Dropdown | ✅ | All 13 provinces & territories |
| 13 | Did you sell or purchase property in Canada in 2025? | Multiple choice | ✅ | Yes, No |
| 14 | Do you have any foreign property above $100,000 cost? | Multiple choice | ✅ | Yes, No |
| 15 | Last 3 digits of your SIN | Short answer | ✅ | Regex: `\d{3}` — Description: "**Do not** enter your full SIN. Only the last 3 digits." |
| 16 | RRSP contribution amount (if any) | Short answer | ❌ | Number |
| 17 | Rent amount (Ontario only) | Short answer | ❌ | Number |
| 18 | Number of months you stayed | Short answer | ❌ | Number, 0–12 |
| 19 | Landlord name and address (Ontario only) | Paragraph | ❌ | |
| 20 | Consent | Checkbox | ✅ | "I consent to Devesh Tax Services collecting and using my information for tax filing, per the Privacy Policy." Links: your `/privacy.html` and `/terms.html` |
| 21 | How did you hear about us? | Short answer | ❌ | |

**Form settings:**
- Responses → Collect email addresses → **Responder input** (not verified).
- Responses → **Allow response editing: Off**.
- Presentation → **Show progress bar: On**.
- Default → **Do not require sign-in**.

### Form 2 — Returning Client Update

Title: **"Devesh Tax Services — 2025 Returning Client Update"**.

| # | Question | Type | Required | Notes |
|---|---|---|---|---|
| 1 | Email address | Short answer | ✅ | Regex validated |
| 2 | Full name | Short answer | ✅ | |
| 3 | Last 3 digits of SIN | Short answer | ✅ | Regex `\d{3}` |
| 4 | Province of residence on Dec 31, 2025 | Dropdown | ✅ | 13 provinces/territories |
| 5 | Has your marital status changed? | Multiple choice | ✅ | Yes, No |
| 6 | Current marital status | Dropdown | ❌ | Single, Married, Common-law, Divorced, Widowed, Separated |
| 7 | Spouse name (if applicable) | Short answer | ❌ | |
| 8 | Is your spouse in Canada? | Multiple choice | ❌ | Yes, No |
| 9 | Did you sell or purchase property in Canada in 2025? | Multiple choice | ✅ | Yes, No |
| 10 | Do you have foreign property above $100,000 cost? | Multiple choice | ✅ | Yes, No |
| 11 | Has your address changed since last year? | Multiple choice | ✅ | Yes, No |
| 12 | New mailing address (if changed) | Paragraph | ❌ | |
| 13 | Consent | Checkbox | ✅ | |

Same settings as Form 1.

### Publish and get embed URLs

For each form:
1. Click **Send** → **link icon** → **Copy**.
2. Change `viewform` to `viewform?embedded=true` in the URL.
3. Or use: Form → **Send** → **`<>` embed HTML** → copy the `src` value.

Paste into `config.js`:

```js
NEW_CLIENT_FORM_EMBED: 'https://docs.google.com/forms/d/e/FORM_ID/viewform?embedded=true',
RETURNING_CLIENT_FORM_EMBED: 'https://docs.google.com/forms/d/e/FORM_ID_2/viewform?embedded=true',
```

Commit and push. The form should appear on `/submit.html`.

---

## 4. Create the two Google Sheets

1. From each Google Form: **Responses → Link to Sheets → Create a new spreadsheet**.
2. Name them `DTS-2025-New-Client` and `DTS-2025-Returning`.

Add these columns to the **right** of the auto-generated form responses:

For `DTS-2025-New-Client`:

| Column | Header |
|---|---|
| A | Timestamp |
| B | Email address |
| C | First name |
| D | Surname |
| E | Phone number |
| F | Date of birth |
| G | Mailing address |
| H | Arrival date |
| I | Marital status |
| J | Spouse name |
| K | Spouse in Canada |
| L | Spouse arrival date |
| M | Province |
| N | Property sold |
| O | Foreign property |
| P | Last 3 SIN |
| Q | RRSP |
| R | Rent |
| S | Months stayed |
| T | Landlord info |
| U | Consent |
| V | Referral source |
| **W** | **Customer ID** ← formula |
| **X** | **Status** ← dropdown |
| **Y** | **Filed date** |
| **Z** | **Notes** |
| **AA** | **Fiscal Year** ← formula |

Same structure for the returning sheet (skip some fields, but keep the ID/Status/Filed/Notes/FY columns).

**Customer ID formula (W2, then fill down):**

```
=IF(ISBLANK(A2), "", "DTS-"&YEAR(A2)&"-"&TEXT(ROW()-1, "0000"))
```

**Fiscal Year formula (AA2):**

```
=IF(ISBLANK(A2), "", YEAR(A2) - IF(MONTH(A2)<4, 1, 0) & "-" & YEAR(A2) + IF(MONTH(A2)<4, 0, 1))
```

**Status dropdown (X column):** Data → Data validation → List of items:
`New – Awaiting Documents, In Process, Waiting on CRA, Waiting on Client, Filed/Processed`

---

## 5. Set up the Apps Script automation

For each of the two Sheets:

1. **Extensions → Apps Script**.
2. Paste this code (both sheets get the same code — Customer ID logic checks for existing entry):

```javascript
/**
 * Devesh Tax Services — Form submit automation
 * Runs on the Sheet owned by the form.
 */

const BUSINESS_NAME = 'Devesh Tax Services';
const OWNER_EMAIL   = 'deveshtax11@gmail.com';
const OWNER_NAME    = 'Devesh [Surname]';
const SIMPLE_FEE    = '$45';
const E_TRANSFER    = 'deveshtax11@gmail.com';
const EMAIL_BODY_SIG = 'Devesh [Surname]\nRegistered Income Tax Consultant\n' + OWNER_EMAIL + ' | 647-999-8523';

/**
 * Trigger: From spreadsheet -> On form submit.
 * IMPORTANT: Create this trigger manually in the Apps Script editor:
 *   Triggers → Add Trigger → Function: onFormSubmit → From spreadsheet → On form submit → Save.
 */
function onFormSubmit(e) {
  const sheet = e.range.getSheet();
  const row = e.range.getRow();
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];

  // Find column indices by header name
  const col = name => headers.indexOf(name) + 1;
  const get = name => {
    const c = col(name);
    return c > 0 ? sheet.getRange(row, c).getValue() : '';
  };

  const email      = get('Email address');
  const firstName  = get('First name') || get('Full name') || 'there';
  const surname    = get('Surname') || '';
  const customerId = get('Customer ID');

  if (!email) return;

  // --- Build the client auto-reply ---
  const subject = `Your ${BUSINESS_NAME} intake is received — Customer ID ${customerId}`;
  const body = `Hi ${firstName},

Thank you for submitting your intake to ${BUSINESS_NAME}. Your return is now in our queue.

YOUR CUSTOMER ID
${customerId}

Please include this ID in every email you send us. It helps us find your file quickly.

NEXT STEP: EMAIL YOUR DOCUMENTS
Reply to this email (or send a new one) with subject line:

    ${customerId} - ${surname || '[Surname]'} - 2025 Tax Documents

Attach the slips that apply to you. A full checklist is at:
https://devesh-code-git.github.io/DeveshTaxReturns/documents.html

Key items we usually need:
  - T4 (from every employer)
  - T4A, T4E, T5, T5008, T4FHSA (if applicable)
  - T2202 (tuition)
  - RRSP contribution receipts
  - Donation receipts
  - Rent receipts or lease (Ontario only)
  - Property tax bill (if you own property)
  - Copy of your SIN paper
  - Void cheque or direct deposit slip
  - Last year's Notice of Assessment (if you have one)

IMPORTANT: Do not send passwords. Do not send full SIN numbers over the website form. Send documents only by email to ${OWNER_EMAIL}.

PAYMENT
Fee for a simple return: ${SIMPLE_FEE} per person/per year.
Interac e-Transfer to: ${E_TRANSFER}
Security question and answer: [SET IN AUTO-REPLY EMAIL ONLY - see 'E_TRANSFER_SECURITY_Q/A' in the config]

If your return involves self-employment, rental income, Uber/delivery, capital gains, or foreign property, please reply so we can quote you before you pay.

WHAT HAPPENS NEXT
1. We confirm receipt of your documents (usually within 1 business day).
2. We prepare your return and contact you with any questions.
3. We send you a draft for review.
4. Once approved and paid, we file with CRA.

Any questions? Just reply to this email.

Best regards,
${EMAIL_BODY_SIG}
`;

  MailApp.sendEmail({
    to: email,
    subject: subject,
    body: body,
    name: BUSINESS_NAME
  });

  // --- Notify the owner ---
  const ownerSubject = `[New intake] ${customerId} — ${firstName} ${surname}`;
  const ownerBody = `New intake received.

Customer ID: ${customerId}
Name: ${firstName} ${surname}
Email: ${email}
Phone: ${get('Phone number')}
Province: ${get('Province') || get('Province of residence on Dec 31, 2025')}
Marital status: ${get('Marital status')}
Property sold: ${get('Property sold') || get('Did you sell or purchase property in Canada in 2025?')}
Foreign property >$100k: ${get('Foreign property') || get('Do you have any foreign property above $100,000 cost?')}
RRSP: ${get('RRSP') || 0}
Rent: ${get('Rent') || 0}
Referral: ${get('Referral source') || '—'}
Submitted: ${get('Timestamp')}

Review in the Sheet: https://docs.google.com/spreadsheets/d/${SpreadsheetApp.getActive().getId()}/
`;

  MailApp.sendEmail({
    to: OWNER_EMAIL,
    subject: ownerSubject,
    body: ownerBody,
    name: BUSINESS_NAME
  });

  // --- Set initial status if blank ---
  const statusCol = col('Status');
  if (statusCol > 0) {
    const statusCell = sheet.getRange(row, statusCol);
    if (!statusCell.getValue()) statusCell.setValue('New – Awaiting Documents');
  }
}
```

3. **Save**. Then **Triggers** (clock icon) → **Add Trigger**:
   - Function: `onFormSubmit`
   - Event source: **From spreadsheet**
   - Event type: **On form submit**
   - Failure notification: **Notify me immediately**
   - **Save** (Google will ask for authorisation — click Allow).

4. **Test**: submit a real form. Check your inbox and the Sheet.

> **⚠️ Important:** `E_TRANSFER_SECURITY_Q/A` should be appended to the client auto-reply body. Add it manually to the body string **after** the first test — the answer is not visible to the public.

---

## 6. Looker Studio dashboard (optional but recommended)

1. Go to [lookerstudio.google.com](https://lookerstudio.google.com) → **Create → Report**.
2. Add data source: **Google Sheets → DTS-2025-New-Client**.
3. Add second source: **DTS-2025-Returning**.
4. Create a **blended data source** keyed on `Customer ID`.
5. Build these report pages:

**Page 1 — Overview**
- Scorecards: Total submissions this FY, New clients this month, Open cases (Status = In Process or Waiting), Filed count.
- Bar chart: Submissions by Province.

**Page 2 — Funnel**
- Bar chart: Count of Customer ID grouped by Status.
- Funnel chart: Status transitions.

**Page 3 — Time**
- Line chart: Submissions by Date (with a date-range control).
- Filter control: Fiscal Year dropdown (from the `Fiscal Year` column).
- Add a `Week` and `Month` dimension for weekly/monthly reports.

**Page 4 — Status**
- Donut chart: Status.
- Table: Customer ID | Name | Status | Filed date.

**Page 5 — Referrals**
- Bar chart: Referral source (top 10).

**Page 6 — 7-year history**
- Add a `Year` filter control.
- Line chart: Submissions by Year, with a filter date range from 2018 to now.

Every chart is auto-updated as Sheets receive new rows.

---

## 7. Post-launch checklist

- [ ] `2FA enabled` on the Google account owning the forms and sheets.
- [ ] `config.js` placeholders replaced with real values.
- [ ] Both Google Form URLs pasted into `config.js`.
- [ ] Both auto-reply emails tested end-to-end.
- [ ] Owner notification email received (test with a fake submission).
- [ ] All 8 pages render correctly on iPhone Safari and Android Chrome.
- [ ] Theme toggle persists across page reloads and switches system correctly.
- [ ] Submit page segmented tabs switch without reload.
- [ ] Email link on Contact page copies to clipboard (Snackbar shows).
- [ ] Document filters work on `/documents.html`.
- [ ] `/privacy.html` and `/terms.html` load and `Last updated` shows the correct date.
- [ ] 404 page loads for a non-existent URL.
- [ ] `robots.txt` and `sitemap.xml` reference the correct domain.
- [ ] GitHub Pages builds successfully (check repo → Actions).

---

## 8. Placeholder reference

| Placeholder | Where it's used | Example value |
|---|---|---|
| `{{BUSINESS_NAME}}` | Header, footer, page titles | Devesh Tax Services |
| `{{OWNER_NAME}}` | About, legal pages | Devesh [Surname] |
| `{{OWNER_CREDENTIAL}}` | About, hero badge | Registered Income Tax Consultant |
| `{{SERVICE_AREA}}` | Hero chip, footer | Ontario, Canada |
| `{{HOURS}}` | About card, contact table | Mon–Fri 9–6 ET |
| `{{EMAIL}}` | Throughout | deveshtax11@gmail.com |
| `{{PHONE}}` | Contact, footer | 647-999-8523 |
| `{{SIMPLE_FEE}}` | Hero, fee card, submit page | $45 |
| `{{E_TRANSFER_EMAIL}}` | Fee card, submit page | deveshtax11@gmail.com |
| `{{PRIVACY_OFFICER_NAME}}` | Privacy policy | Devesh [Surname] |
| `{{RETENTION_YEARS}}` | Privacy, terms | 6 |
| `{{LAST_UPDATED}}` | Privacy, terms | January 1, 2025 |

---

## 9. Known limitations & future upgrades

- **Google Forms branding** cannot be removed on a personal Gmail account. Upgrade to Google Workspace (~$7/user/mo) to remove it and unlock file uploads.
- **Supabase/Firebase portal** (auth, client dashboard, document upload) is Phase 2. The data model and field names here are designed to migrate cleanly.
- **PDF generation** is not yet automated — you export the Sheet row to PDF if needed.