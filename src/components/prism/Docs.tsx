import { Eyebrow } from "./primitives";
import { DocLayout, DocSection as Section, Faq, KV, Lead, P, Pre, type TocGroup, Ul } from "./dockit";

const GROUPS: TocGroup[] = [
  {
    label: "Getting started",
    items: [
      { id: "overview", n: "01", title: "What sits underneath" },
      { id: "s1", n: "02", title: "Introduction" },
      { id: "s2", n: "03", title: "Core principles" },
      { id: "s30", n: "04", title: "Developer quickstart" },
    ],
  },
  {
    label: "Product",
    items: [
      { id: "s3", n: "05", title: "The Prism account model" },
      { id: "s5", n: "06", title: "Reachability" },
      { id: "s10", n: "07", title: "Direct payments" },
      { id: "s16", n: "08", title: "Payment requests" },
      { id: "s13", n: "09", title: "Send before signup" },
      { id: "s14", n: "10", title: "Claims" },
      { id: "s15", n: "11", title: "Claim lifecycle" },
      { id: "s17", n: "12", title: "Cross-border payments" },
      { id: "s18", n: "13", title: "Add money" },
      { id: "s19", n: "14", title: "Activity" },
      { id: "s20", n: "15", title: "Receipts" },
      { id: "s25", n: "16", title: "Recovery" },
    ],
  },
  {
    label: "Protocol",
    items: [
      { id: "s27", n: "17", title: "Architecture" },
      { id: "s4", n: "18", title: "Mera accounts" },
      { id: "s8", n: "19", title: "USDC" },
      { id: "s9", n: "20", title: "Gasless payments" },
      { id: "s6", n: "21", title: "Protected Alias Resolver" },
      { id: "s11", n: "22", title: "Payment intent integrity" },
      { id: "s12", n: "23", title: "Transaction truth" },
      { id: "s28", n: "24", title: "Contracts" },
    ],
  },
  {
    label: "Developers",
    items: [
      { id: "s29", n: "25", title: "API" },
      { id: "s21", n: "26", title: "Envio" },
      { id: "s22", n: "27", title: "Alchemy" },
    ],
  },
  {
    label: "Security",
    items: [
      { id: "s24", n: "28", title: "Security model" },
      { id: "s23", n: "29", title: "Privacy model" },
      { id: "s7", n: "30", title: "Identity-change protection" },
      { id: "s26", n: "31", title: "Failure states" },
    ],
  },
  {
    label: "Proof",
    items: [{ id: "s31", n: "32", title: "Evidence and verification" }],
  },
  {
    label: "Metropolis",
    items: [{ id: "s32", n: "33", title: "Metropolis integration" }],
  },
  {
    label: "Resources",
    items: [
      { id: "s33", n: "34", title: "FAQ" },
      { href: "/whitepaper", title: "Whitepaper" },
      { href: "https://github.com/cybort360/prism-web", title: "GitHub" },
    ],
  },
];

export function DocsPage() {
  return (
    <DocLayout
      groups={GROUPS}
      hero={
        <>
          <Eyebrow className="anim-fade-up">Prism Docs</Eyebrow>
          <h1 className="display mt-6 max-w-[16ch] text-[44px] leading-[0.92] sm:text-[64px] lg:text-[84px]">
            Pay people. Not wallets.
          </h1>
          <p className="anim-fade-up mt-8 max-w-[64ch] text-[17px] leading-relaxed text-surface-dark-foreground/75 md:text-[19px]">
            Prism is an iPhone-first consumer payment system that lets people send and request digital dollars using
            identities they already understand: contacts, phone numbers, @Prism handles, QR codes and payment links.
          </p>
          <Pre>{`Person → Amount → Face ID / PIN → Sent`}</Pre>
          <p className="mt-6 max-w-[64ch] text-[15px] leading-relaxed text-surface-dark-foreground/70">
            Prism handles the account, signing, settlement and indexing infrastructure underneath. Users do not need to
            understand wallet addresses, gas, seed phrases, RPC endpoints or blockchain networks to use Prism.
          </p>
        </>
      }
    >
      {/* GETTING STARTED */}
      <Section id="overview" n="01" title="What sits underneath">
        <Lead>
          Reachability tells Prism who you mean. Mera proves who may authorize money. USDC is the money being moved.
          Monad is the settlement layer.
        </Lead>
        <Pre>{`PHONE / @HANDLE / QR / LINK
        ↓
   PRISM RESOLUTION
        ↓
   PRISM IDENTITY
        ↓
  MERA PASSKEY ACCOUNT
        ↓
       USDC
        ↓
      MONAD
        ↓
  ALCHEMY + ENVIO`}</Pre>
        <KV
          rows={[
            ["Reachability", "Tells Prism who you mean."],
            ["Mera", "Proves who may authorize money."],
            ["USDC", "The money being moved."],
            ["Monad", "The settlement layer."],
            ["Alchemy", "Live chain access."],
            ["Envio", "Indexed activity and evidence."],
          ]}
        />
      </Section>

      <Section id="s1" n="02" title="Introduction">
        <P>Prism is a human-addressed payment layer.</P>
        <P>Traditional crypto payments begin with an account address (0x7a…). Prism begins with a person: Tobi.</P>
        <P>
          The wallet still exists underneath, but it is infrastructure rather than interface. Prism translates a human
          recipient into an authorized financial destination, lets the payer approve the transfer using familiar iPhone
          security, and settles the payment on Monad.
        </P>
        <Lead>Financial infrastructure should become more sophisticated without becoming more visible.</Lead>
      </Section>

      <Section id="s2" n="03" title="Core principles">
        <h3 className="mt-6 text-[17px] font-medium text-ink">People, not wallets</h3>
        <P>Users should select the person they intend to pay, not manually identify blockchain accounts.</P>
        <h3 className="mt-8 text-[17px] font-medium text-ink">Phone-first, not phone-only</h3>
        <P>
          Phone numbers make Prism useful immediately because the user's existing Contacts can become their payment
          directory. But a phone number is not Prism identity and is never the only way to receive. Prism also supports
          @Prism handles, payment QR codes and payment links; future aliases can be added without changing the
          underlying financial account.
        </P>
        <h3 className="mt-8 text-[17px] font-medium text-ink">Reachability is not authority</h3>
        <Pre>{`Phone number   → helps someone find you
@handle        → helps someone find you
OTP            → proves control of an alias
Mera passkey   → authorizes your money`}</Pre>
        <P>Controlling someone's phone number must not automatically mean controlling their funds.</P>
        <h3 className="mt-8 text-[17px] font-medium text-ink">Monad is canonical</h3>
        <P>
          Prism does not maintain a private balance database and call it onchain money. Canonical financial facts come
          from Monad: USDC balance, settlement, claim funding, claim completion and refunds. Prism services may cache
          and index data, but cannot override chain state.
        </P>
      </Section>

      <Section id="s30" n="04" title="Developer quickstart">
        <h3 className="mt-6 text-[17px] font-medium text-ink">Prerequisites</h3>
        <Ul
          items={[
            "Node · Foundry · Xcode · XcodeGen",
            "Monad RPC · USDC testnet funds",
            "Alchemy credentials · Envio configuration",
            "OTP provider credentials",
          ]}
        />
        <Pre>{`git clone ...
cd prism

./scripts/setup.sh
./scripts/test-all.sh`}</Pre>
        <P>Workspaces are separated: /contracts · /backend · /indexer · /ios · /web.</P>
      </Section>

      {/* PRODUCT */}
      <Section id="s3" n="05" title="The Prism account model">
        <P>A Prism Identity is the stable product identity connecting a user to their account and aliases.</P>
        <Pre>{`Prism Identity
├── Mera account
├── verified phone alias
├── @handle
├── payment links
├── authorized sessions
└── payment history`}</Pre>
        <P>
          Prism Identity should survive phone-number changes, handle changes, device replacement, passkey restoration
          and alias revocation. It is not intended to become a universal identity protocol. Its purpose is continuity
          inside the Prism payment system.
        </P>
      </Section>

      <Section id="s5" n="06" title="Reachability">
        <h3 className="mt-6 text-[17px] font-medium text-ink">Phone aliases</h3>
        <P>
          Phone numbers are private Prism aliases. They are useful because they let users select recipients directly
          from iOS Contacts.
        </P>
        <Pre>{`User taps Tobi
        ↓
Prism reads Tobi's selected phone number locally
        ↓
Protected resolver lookup
        ↓
Tobi's Prism recipient account`}</Pre>
        <P>Prism does not upload the user's entire address book. Resolution happens on demand.</P>
        <h3 className="mt-8 text-[17px] font-medium text-ink">Phone privacy</h3>
        <P>
          Prism must never publish <code>phone → wallet</code> or <code>SHA256(phone) → wallet</code> onchain. Phone
          numbers come from a relatively small enumerable namespace; publishing deterministic hashes would allow
          attackers to attempt reverse discovery at scale. The v1 protected resolver keeps phone resolution offchain and
          rate-limited.
        </P>
      </Section>

      <Section id="s10" n="07" title="Direct payments">
        <P>The primary payment flow:</P>
        <Pre>{`Select Tobi → Enter $20 → Dinner → Review
   → PIN / Face ID → Mera authorization
   → USDC authorization → Prism relay
   → Monad settlement → Reconciliation → Sent`}</Pre>
        <P>The user only experiences: Tobi · $20 · Face ID · Sent.</P>
      </Section>

      <Section id="s16" n="08" title="Payment requests">
        <P>Requests are signed Prism objects rather than blockchain transactions.</P>
        <Pre>{`Jayson requested $15.00
Lunch

[ Decline ]  [ Pay ]`}</Pre>
        <P>Request lifecycle: OPEN · PAID · DECLINED · CANCELLED · EXPIRED.</P>
        <P>
          A payment fulfilling a request includes its opaque requestId, creating a cryptographic relationship between
          REQUEST → PAYMENT without leaking phone information.
        </P>
      </Section>

      <Section id="s13" n="09" title="Send before signup">
        <P>One of Prism's defining capabilities is paying someone who does not yet use Prism.</P>
        <Pre>{`Octane selects David
        ↓
David is not on Prism
        ↓
Send $20 anyway
        ↓
USDC placed in ClaimVault
        ↓
David receives invitation`}</Pre>
        <P>
          The sender sees “$20 waiting for David.” The funds are not sent to an unknown wallet. They are held until the
          intended recipient proves eligibility.
        </P>
      </Section>

      <Section id="s14" n="10" title="Claims">
        <P>A claim contains no public phone number.</P>
        <Pre>{`Claim {
  claimId
  recipientReference
  sender
  amount
  expiry
  status
}`}</Pre>
        <P>Both claimId and recipientReference are opaque / random identifiers. When David later joins:</P>
        <Pre>{`David verifies his phone
        ↓
Prism confirms claim eligibility
        ↓
David establishes / restores Mera account
        ↓
Claim authorization created
        ↓
David authorizes claim
        ↓
ClaimVault releases USDC`}</Pre>
      </Section>

      <Section id="s15" n="11" title="Claim lifecycle">
        <P>Successful flow:</P>
        <Pre>{`created → funded → waiting → recipient_verified
→ claimable → claiming → claimed`}</Pre>
        <P>Refund flow:</P>
        <Pre>{`created → funded → waiting → expired
→ refund_available → refunded`}</Pre>
        <h3 className="mt-8 text-[17px] font-medium text-ink">Security requirements</h3>
        <Ul
          items={[
            "Wrong claimant fails",
            "Expired authorization fails",
            "Double claim fails",
            "Claim after refund fails",
            "Refund before expiry fails",
            "Double refund fails",
            "Caller cannot redirect refund destination",
          ]}
        />
        <P>Funds must never become permanently stranded.</P>
      </Section>

      <Section id="s17" n="12" title="Cross-border payments">
        <P>
          Prism's payment model is naturally cross-border because recipients are reached using human identifiers while
          USDC moves underneath.
        </P>
        <Pre>{`Octane                       Sherggs
Nigeria    → $20 USDC →      United Kingdom
+234...                      +44...`}</Pre>
        <P>Prism does not claim to perform FX where no FX mechanism exists. The accurate claim:</P>
        <Lead>
          USDC-denominated value can move between human-addressed Prism users across borders without requiring
          bank-account identifiers or wallet-address UX.
        </Lead>
      </Section>

      <Section id="s18" n="13" title="Add money">
        <P>
          For the Metropolis release, Prism should not pretend to have a bank on-ramp that does not exist. Add Money
          supports legitimate USDC funding paths. The development / test environment may expose the Prism account
          address, a QR code, copy-address, and a supported faucet / testnet flow. Future fiat funding systems can be
          integrated separately.
        </P>
      </Section>

      <Section id="s19" n="14" title="Activity">
        <P>Activity is Prism's human-readable financial history.</P>
        <Pre>{`TODAY

Mum      · Gift            +$50.00   Completed
Tobi     · Dinner          -$20.00   Completed
Jayson   · Lunch    $15.00 requested Pending
David    · Movie tickets   -$10.00   Waiting to be claimed`}</Pre>
        <P>
          Activity combines canonical Monad state, Envio indexed events, reconciled Prism operations and signed request
          state. The backend cannot simply mark transactions successful independently.
        </P>
      </Section>

      <Section id="s20" n="15" title="Receipts">
        <P>A Prism receipt has two layers. The consumer receipt:</P>
        <Pre>{`Tobi
$20.00
Dinner
Completed · September 4, 2026`}</Pre>
        <P>Advanced network details, available for verification but hidden from normal payment UX:</P>
        <KV
          rows={[
            ["Network", "Monad"],
            ["Asset", "USDC"],
            ["Transaction", "0x…"],
            ["Block", "…"],
            ["Status", "Confirmed"],
          ]}
        />
      </Section>

      <Section id="s25" n="16" title="Recovery">
        <P>Prism recovery must not collapse identity and authority.</P>
        <KV
          rows={[
            ["New phone number", "Verify new number + authorize using existing Prism / Mera authority → update alias."],
            [
              "Lost phone",
              "Restore Mera account via supported passkey recovery → recover Prism relationship → revalidate aliases.",
            ],
            ["SIM swap", "Attacker receives OTP → may prove number possession → cannot authorize funded account."],
          ]}
        />
      </Section>

      {/* PROTOCOL */}
      <Section id="s27" n="17" title="Architecture">
        <Pre>{`┌─────────────────────┐
│      iPHONE         │
│ Contacts            │
│ @Prism              │
│ QR / Links          │
│ PIN / Face ID       │
└─────────┬───────────┘
          ▼
┌────────────────────────┐
│     PRISM SERVICES     │
│ OTP                    │
│ Protected Resolver     │
│ Prism Identity         │
│ Payment Requests       │
│ Claim Eligibility      │
│ Relayer                │
│ Reconciliation         │
└──────────┬─────────────┘
           │  Mera Authorization
           ▼
┌────────────────────────┐
│        MONAD           │
│ USDC                   │
│ Payment Router         │
│ ClaimVault             │
└──────┬─────────┬───────┘
       │         │
    Alchemy    Envio
     Live      Indexed
    chain      history`}</Pre>
      </Section>

      <Section id="s4" n="18" title="Mera accounts">
        <P>
          Prism uses Mera as the user-facing cryptographic account layer. The objective is a real self-controlled
          account without forcing users to manage seed phrases, browser extensions, exported private keys or wallet
          applications. The user's passkey becomes the account authority.
        </P>
        <Pre>{`Face ID / local approval
        ↓
Mera passkey
        ↓
cryptographic authorization
        ↓
Prism payment`}</Pre>
        <P>Prism servers never receive the user's passkey secret.</P>
        <h3 className="mt-8 text-[17px] font-medium text-ink">Recovery</h3>
        <P>
          Account recovery is based on the Mera / passkey model rather than SMS. A phone number may be reverified as a
          reachability alias, but OTP alone can never recover control of a funded Prism account. This is an explicit
          protection against SIM-swap attacks.
        </P>
      </Section>

      <Section id="s8" n="19" title="USDC">
        <P>
          Prism uses USDC as its payment asset for the Metropolis implementation. The consumer UI presents ordinary
          dollar amounts ($20.00), not token portfolio information. Users should think “dollars,” not “ERC-20 token.”
          USDC is the monetary rail underneath Prism's consumer experience.
        </P>
      </Section>

      <Section id="s9" n="20" title="Gasless payments">
        <P>A normal Prism user should be able to hold USDC &gt; 0 and MON = 0 and still make a payment.</P>
        <P>
          Prism uses authorization-based transfers and relayed execution, so the user never needs to acquire or manage
          MON before sending. The product never displays “You need MON for gas.” This is a core product requirement, not
          merely a convenience.
        </P>
      </Section>

      <Section id="s6" n="21" title="Protected Alias Resolver">
        <P>The resolver maps human aliases to Prism identities. For phones:</P>
        <Pre>{`selected phone
      ↓
authenticated resolver
      ↓
alias state / version
      ↓
recipient Prism identity
      ↓
Mera account`}</Pre>
        <P>The resolver returns short-lived resolution information rather than a permanent public mapping.</P>
        <Pre>{`ResolutionResult {
  recipient
  prismIdentity
  aliasVersion
  issuedAt
  expiresAt
  resolutionId
}`}</Pre>
        <h3 className="mt-8 text-[17px] font-medium text-ink">Fail closed</h3>
        <P>If Prism cannot confidently resolve a recipient, it does not guess. These fail rather than pay silently:</P>
        <Ul
          items={[
            "Stale alias",
            "Revoked alias",
            "Duplicate / ambiguous state",
            "Resolver unavailable",
            "Unexpected account change",
          ]}
        />
      </Section>

      <Section id="s11" n="22" title="Payment intent integrity">
        <P>
          Prism binds what the user saw to what is executed. A signed payment envelope commits to consequential fields:
        </P>
        <Pre>{`paymentId · payer · recipient · token · amount
requestId · resolution reference · expiry · nonce`}</Pre>
        <P>
          If an attacker changes the recipient, amount, request ID, expiry or authorization parameters after approval,
          signature verification must fail.
        </P>
      </Section>

      <Section id="s12" n="23" title="Transaction truth">
        <P>Prism distinguishes transaction submission from actual payment completion. Internally:</P>
        <Pre>{`created → awaiting_authorization → ready → submitted
→ processing → confirming → confirmed → indexed
→ reconciled → completed`}</Pre>
        <P>The consumer UI compresses this to: Sending… → Settling… → Sent.</P>
        <P>Prism must never show “Sent” merely because an RPC endpoint accepted the transaction.</P>
      </Section>

      <Section id="s28" n="24" title="Contracts">
        <h3 className="mt-6 text-[17px] font-medium text-ink">PrismPaymentRouter</h3>
        <Ul
          items={[
            "Payment-envelope validation",
            "Payment / reference integrity",
            "USDC execution",
            "Replay prevention",
            "Settlement events",
          ]}
        />
        <h3 className="mt-8 text-[17px] font-medium text-ink">PrismClaimVault</h3>
        <Ul
          items={[
            "Claim funding",
            "Claim state",
            "Eligibility enforcement",
            "Recipient authorization",
            "Expiry",
            "Refunds",
          ]}
        />
        <P>No PhoneRegistry contract. No human-readable phone information onchain.</P>
      </Section>

      {/* DEVELOPERS */}
      <Section id="s29" n="25" title="API">
        <P>The API is domain-first. Raw ABI and calldata are not the primary vocabulary.</P>
        <Pre>{`POST /v1/otp/start
POST /v1/otp/verify

GET  /v1/resolve/handle/:handle
POST /v1/resolve/phone

POST /v1/payments/prepare
POST /v1/payments/submit
GET  /v1/payments/:id

POST /v1/requests
POST /v1/requests/:id/pay
POST /v1/requests/:id/decline

POST /v1/claims/prepare
POST /v1/claims/:id/claim
POST /v1/claims/:id/refund

GET  /v1/activity
GET  /v1/me`}</Pre>
      </Section>

      <Section id="s21" n="26" title="Envio">
        <P>Envio powers Prism's indexed history and proof surfaces. Prism indexes consequential events such as:</P>
        <Ul items={["PaymentSettled", "ClaimFunded", "Claimed", "Refunded"]} />
        <P>
          Envio data drives Activity, receipts, payment history, claim history, the proof dashboard and indexing-latency
          measurements. Envio does not replace Monad as canonical state.
        </P>
      </Section>

      <Section id="s22" n="27" title="Alchemy">
        <P>Alchemy provides Prism's live Monad infrastructure. It is used for:</P>
        <Ul
          items={[
            "Chain reads",
            "USDC balance reads",
            "Simulation",
            "Transaction submission",
            "Receipt lookups",
            "Reconciliation",
          ]}
        />
        <P>
          Prism keeps the provider behind an abstraction so chain correctness does not depend on application UI
          components.
        </P>
      </Section>

      {/* SECURITY */}
      <Section id="s24" n="28" title="Security model">
        <P>Security is built around explicit separation.</P>
        <Pre>{`Phone control    ≠  Prism account authority
OTP              ≠  financial signing authority
Backend session  ≠  Mera authority
Resolver result  ≠  permission to spend`}</Pre>
        <h3 className="mt-8 text-[17px] font-medium text-ink">Key attack classes</h3>
        <Ul
          items={[
            "SIM swap · phone recycling · alias takeover",
            "Resolver compromise · replay · payment mutation",
            "Fraudulent claim · double claim · premature refund",
            "Relayer abuse · backend compromise · RPC inconsistency",
            "Indexing delay · ambiguous transaction submission",
            "Phishing · stolen / unlocked device",
          ]}
        />
      </Section>

      <Section id="s23" n="29" title="Privacy model">
        <P>Prism's privacy claims are intentionally narrow.</P>
        <KV
          head={["Private", "Potentially public"]}
          rows={[
            ["Raw phone alias", "Account addresses"],
            ["Contact graph", "USDC transfers"],
            ["PIN", "Contract interactions"],
            ["Passkey secret", "Transaction timestamps"],
            ["OTP", "Claim contract state"],
            ["Private resolver mapping", ""],
          ]}
        />
        <P>
          Prism must never claim “payments are private.” The correct claim is: human identity resolution is kept
          separate from public blockchain settlement.
        </P>
      </Section>

      <Section id="s7" n="30" title="Identity-change protection">
        <P>
          Suppose a user previously paid Tobi. Prism remembers the previously trusted recipient identity. If Tobi's
          phone later resolves to a different Prism account, Prism blocks normal sending and the user sees:
        </P>
        <Lead>Tobi's payment identity changed. For your safety, review before sending.</Lead>
        <P>
          This protects against recycled phone numbers, compromised aliases, unauthorized rebinding, stale resolver
          state and operational mistakes. The same rule applies to both phone aliases and public handles.
        </P>
      </Section>

      <Section id="s26" n="31" title="Failure states">
        <P>Every path resolves. Documented behavior:</P>
        <KV
          head={["Failure", "Prism behavior"]}
          rows={[
            ["Contacts denied", "Handle / manual recipient path"],
            ["Recipient unknown", "Send-before-signup"],
            ["Handle unknown", "Return to search"],
            ["Identity changed", "Block and review"],
            ["Resolver unavailable", "Retry; never guess"],
            ["Wrong PIN", "Retry / lockout"],
            ["Face ID unavailable", "PIN"],
            ["Insufficient USDC", "Add Money"],
            ["User has zero MON", "No problem"],
            ["Relay unavailable", "Retry safely"],
            ["Submission ambiguous", "Reconcile first"],
            ["Transaction reverted", "Failed, not Sent"],
            ["Claim expired", "Refund"],
            ["Request expired", "Closed"],
            ["Indexing delayed", "Show confirmed / indexing state"],
          ]}
        />
      </Section>

      {/* PROOF */}
      <Section id="s31" n="32" title="Evidence and verification">
        <P>Prism exposes verifiable evidence for every consequential claim. Categories:</P>
        <Ul
          items={[
            "Contract · Payment · Zero-MON · Mera · USDC proof",
            "Claim · Refund proof",
            "Resolver privacy proof",
            "Envio · Alchemy proof",
            "Mutation / replay proof",
          ]}
        />
        <P>
          For each live proof, show environment, transaction hash, contract, block, before state, after state,
          independent readback and timestamp. No consequential claim relies solely on a screenshot.
        </P>
      </Section>

      {/* METROPOLIS */}
      <Section id="s32" n="33" title="Metropolis integration">
        <P>Primary track: Consumer Products &amp; Payments. What each integration actually does:</P>
        <KV
          rows={[
            ["USDC", "Prism's dollar-denominated payment rail."],
            ["Mera", "The passkey-controlled consumer account layer."],
            ["Envio", "Indexed transaction and claim history."],
            ["Alchemy", "Live Monad RPC and transaction infrastructure."],
            ["Monad", "Settlement."],
          ]}
        />
      </Section>

      {/* RESOURCES */}
      <Section id="s33" n="34" title="FAQ">
        <Faq q="Is Prism a wallet?">
          Underneath, every Prism user has a cryptographic account. But the product is designed around people and
          payments rather than wallet management.
        </Faq>
        <Faq q="Is my phone number my wallet?">No. Your phone number is only one way other people can find you.</Faq>
        <Faq q="Can someone steal my money by stealing my SIM?">
          OTP alone is not enough to control a funded Prism account.
        </Faq>
        <Faq q="Do I need MON?">Normal supported Prism payments are designed so you do not need to manage MON.</Faq>
        <Faq q="Can I use Prism without Contacts permission?">Yes. You can use @handles, QR codes and links.</Faq>
        <Faq q="What if the recipient does not have Prism?">
          Prism can hold a claim for the intended recipient until they join and verify eligibility.
        </Faq>
        <Faq q="Are Prism payments private?">
          Normal Monad settlement is public. Prism protects the link between private human aliases and public settlement
          addresses, but does not claim private blockchain transactions.
        </Faq>
      </Section>
    </DocLayout>
  );
}
