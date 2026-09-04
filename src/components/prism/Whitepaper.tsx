import { Eyebrow, Mono } from "./primitives";
import { DocLayout, DocSection as Section, KV, Lead, P, Pre, type TocItem, Ul } from "./dockit";

const TOC: TocItem[] = [
  { id: "abstract", n: "00", title: "Abstract" },
  { id: "s1", n: "01", title: "Motivation" },
  { id: "s2", n: "02", title: "Design goal" },
  { id: "s3", n: "03", title: "Human addressing" },
  { id: "s4", n: "04", title: "Identity / authority separation" },
  { id: "s5", n: "05", title: "The Prism Identity" },
  { id: "s6", n: "06", title: "Private alias resolution" },
  { id: "s7", n: "07", title: "Account authority with Mera" },
  { id: "s8", n: "08", title: "Dollar asset layer" },
  { id: "s9", n: "09", title: "Gas abstraction" },
  { id: "s10", n: "10", title: "Payment protocol" },
  { id: "s11", n: "11", title: "Replay resistance" },
  { id: "s12", n: "12", title: "Pre-user payment claims" },
  { id: "s13", n: "13", title: "Claim eligibility" },
  { id: "s14", n: "14", title: "Request protocol" },
  { id: "s15", n: "15", title: "Cross-border model" },
  { id: "s16", n: "16", title: "Canonical state" },
  { id: "s17", n: "17", title: "Reconciliation model" },
  { id: "s18", n: "18", title: "Security model" },
  { id: "s19", n: "19", title: "Security properties" },
  { id: "s20", n: "20", title: "Privacy analysis" },
  { id: "s21", n: "21", title: "Trust assumptions" },
  { id: "s22", n: "22", title: "Sponsor-native architecture" },
  { id: "s23", n: "23", title: "Why Monad" },
  { id: "s24", n: "24", title: "Product economics" },
  { id: "s25", n: "25", title: "No Prism token" },
  { id: "s26", n: "26", title: "Scope" },
  { id: "s27", n: "27", title: "Explicit non-goals" },
  { id: "s28", n: "28", title: "Future work" },
  { id: "s29", n: "29", title: "Evidence methodology" },
  { id: "s30", n: "30", title: "Evaluation criteria" },
  { id: "s31", n: "31", title: "Conclusion" },
];

export function WhitepaperPage() {
  return (
    <DocLayout
      groups={[{ items: TOC }]}
      hero={
        <>
          <Eyebrow className="anim-fade-up">Prism Whitepaper · v1.0</Eyebrow>
          <h1 className="display mt-6 max-w-[18ch] text-[40px] leading-[0.94] sm:text-[56px] lg:text-[72px]">
            Human-addressed digital-dollar payments.
          </h1>
          <p className="anim-fade-up mt-8 max-w-[64ch] text-[17px] leading-relaxed text-surface-dark-foreground/75 md:text-[19px]">
            A consumer payment architecture that separates who someone is, how they are found, and who may authorize
            their money.
          </p>
          <div className="mt-8">
            <Mono className="text-surface-dark-muted">Version 1.0 · Monad Metropolis 2026</Mono>
          </div>
        </>
      }
    >
      <Section id="abstract" n="00" title="Abstract">
        <P>
          Prism is a human-addressed digital-dollar payment system built on Monad. It allows users to send and request
          value using phone contacts, public handles, QR codes and payment links while keeping blockchain addresses, gas
          management and private-key handling outside the normal consumer experience.
        </P>
        <P>
          Prism separates three concerns that crypto payment systems frequently collapse: reachability, identity and
          financial authority. A phone number or handle identifies how a person may be found; a persistent Prism
          identity maintains continuity across aliases and devices; and a Mera-derived passkey account provides
          cryptographic authority over funds.
        </P>
        <P>
          AUSD serves as the payment asset while Monad provides canonical settlement. A protected resolver maps private
          human aliases to recipient identities without publishing a globally enumerable phone directory onchain.
          Recipients who have not yet joined Prism can still receive value through expiring claims that are redeemable
          after identity verification and safely refundable if never claimed.
        </P>
        <P>
          The result is a system in which the user experience resembles a modern consumer payment application while the
          underlying settlement remains independently verifiable onchain.
        </P>
      </Section>

      <Section id="s1" n="01" title="Motivation">
        <Lead>Blockchain payments solved permissionless settlement before solving human addressing.</Lead>
        <P>Users are still frequently expected to understand:</P>
        <Ul items={["Addresses", "Gas", "Networks", "Wallet software", "Signing prompts", "Token standards"]} />
        <P>
          These are infrastructure concepts. Payments themselves are social. People think “Pay Tobi $20,” not “Transfer
          20 units of an ERC-20 asset to account 0x… on chain 143.”
        </P>
        <P>Prism treats the mismatch between those mental models as the product problem.</P>
      </Section>

      <Section id="s2" n="02" title="Design goal">
        <Pre>{`PAYMENT INTENT
"I want to pay Tobi $20."
        ↓
      PRISM
        ↓
AUTHORIZED ONCHAIN SETTLEMENT`}</Pre>
        <P>The system succeeds when infrastructure complexity increases without increasing consumer complexity.</P>
      </Section>

      <Section id="s3" n="03" title="Human addressing">
        <P>A Reachability Alias is a human-meaningful identifier used to discover a Prism recipient.</P>
        <Ul items={["+234…", "@octane", "QR", "Payment link"]} />
        <P>Properties:</P>
        <Ul
          items={[
            "Aliases may rotate",
            "Aliases may be revoked",
            "Multiple aliases may identify one Prism identity",
            "Aliases do not authorize financial activity",
          ]}
        />
      </Section>

      <Section id="s4" n="04" title="Identity / authority separation">
        <Pre>{`HOW I AM FOUND
Phone / @handle / QR / link
        ↓
WHO I AM
Prism Identity
        ↓
WHO CAN AUTHORIZE MY MONEY
Mera passkey account
        ↓
WHERE VALUE SETTLES
AUSD on Monad`}</Pre>
        <Lead>
          Identity continuity does not require authority continuity, and authority must never be inferred merely from
          reachability.
        </Lead>
      </Section>

      <Section id="s5" n="05" title="The Prism Identity">
        <Pre>{`P = (I, A, R, S)

I = persistent Prism identity
A = active financial authority
R = set of reachability aliases
S = application state and history`}</Pre>
        <P>
          An alias can change while I remains stable. An authority can be restored or rotated while I remains stable.
          The user's financial relationship graph therefore does not need to be rebuilt after routine identity changes.
        </P>
      </Section>

      <Section id="s6" n="06" title="Private alias resolution">
        <P>
          Publishing <code>H(phone)</code> does not provide meaningful privacy if the original identifier comes from a
          small enumerable namespace. Prism therefore does not use a deterministic public phone registry.
        </P>
        <P>The v1 resolver provides:</P>
        <Ul
          items={[
            "Authenticated queries",
            "Rate limiting",
            "Protected mappings",
            "Versioned aliases",
            "Short-lived resolution results",
          ]}
        />
        <Lead>
          The Prism v1 resolver is a trusted privacy boundary. It is not presented as a zero-knowledge contact-discovery
          protocol.
        </Lead>
        <P>Future research directions, not current capability:</P>
        <Ul items={["OPRFs", "Private set intersection", "Hardware enclaves", "Oblivious contact discovery"]} />
      </Section>

      <Section id="s7" n="07" title="Account authority with Mera">
        <P>Properties sought from the account layer:</P>
        <Ul
          items={[
            "No seed phrase",
            "No exported private key",
            "Native device authentication",
            "Recoverability through supported passkey mechanisms",
            "Cryptographic signing",
            "Separation from SMS verification",
          ]}
        />
        <P>Mera is the load-bearing component here: the user's passkey becomes the account authority.</P>
      </Section>

      <Section id="s8" n="08" title="Dollar asset layer">
        <P>
          Prism intentionally chooses one primary payment asset for the initial product rather than presenting users
          with a token portfolio. This reduces:
        </P>
        <Ul items={["Asset ambiguity", "Pricing confusion", "Liquidity fragmentation", "UI complexity"]} />
        <P>AUSD becomes the unit users see as dollars.</P>
      </Section>

      <Section id="s9" n="09" title="Gas abstraction">
        <Pre>{`For normal Prism payments:

  MON(user) = 0

must not prevent:

  Transfer(AUSD, payer, recipient, amount)`}</Pre>
        <P>
          Prism uses authorization plus relayed execution. The user pays in the asset they understand; the network token
          remains infrastructure.
        </P>
      </Section>

      <Section id="s10" n="10" title="Payment protocol">
        <Pre>{`P = {
  paymentId,
  payer,
  recipient,
  amount,
  asset,
  requestId,
  resolutionRef,
  validBefore,
  nonce
}

MeraSign(P)`}</Pre>
        <P>The contract and relay must guarantee that execution corresponds exactly to what was approved.</P>
      </Section>

      <Section id="s11" n="11" title="Replay resistance">
        <P>Each authorization must contain:</P>
        <Ul items={["Unique nonce", "Expiry", "Payer", "Recipient", "Amount", "Chain / domain context"]} />
        <P>Reusing it must fail. Mutation must fail.</P>
      </Section>

      <Section id="s12" n="12" title="Pre-user payment claims">
        <Pre>{`C = {
  claimId,
  recipientReference,
  sender,
  amount,
  expiry,
  state
}`}</Pre>
        <P>No phone number appears in C.</P>
        <Pre>{`FUNDED
  ├──→ CLAIMED
  └──→ EXPIRED → REFUNDED`}</Pre>
      </Section>

      <Section id="s13" n="13" title="Claim eligibility">
        <P>Claim release requires two independent authorities:</P>
        <Ul
          items={[
            "Prism confirms that this account is eligible for this human recipient.",
            "The recipient's own Mera account authorizes receiving / claiming.",
          ]}
        />
        <P>Neither one alone is enough.</P>
      </Section>

      <Section id="s14" n="14" title="Request protocol">
        <P>
          Requests are offchain signed objects. The blockchain only needs to see a payment once value moves, which
          avoids unnecessary transaction creation.
        </P>
        <Pre>{`R = {
  requestId,
  requester,
  payer,
  amount,
  asset,
  memo,
  expiry,
  status
}`}</Pre>
        <P>The payment envelope includes requestId.</P>
      </Section>

      <Section id="s15" n="15" title="Cross-border model">
        <P>
          Prism is cross-border at the digital-dollar settlement layer. Users in different jurisdictions can exchange
          AUSD using human identifiers.
        </P>
        <P>Prism does not itself claim, unless those mechanisms are subsequently integrated:</P>
        <Ul items={["Fiat FX", "Local bank settlement", "Regulatory licensing", "Off-ramp coverage"]} />
      </Section>

      <Section id="s16" n="16" title="Canonical state">
        <KV
          head={["Fact", "Canonical source"]}
          rows={[
            ["AUSD balance", "Monad"],
            ["Payment completion", "Monad"],
            ["Claim funds", "ClaimVault"],
            ["Alias mapping", "Prism Resolver"],
            ["Prism identity", "Prism service"],
            ["Passkey authority", "Mera"],
            ["Request state", "Signed Prism state"],
            ["Indexed history", "Envio projection"],
            ["Live RPC read", "Alchemy"],
            ["Contacts", "Local iPhone state"],
          ]}
        />
      </Section>

      <Section id="s17" n="17" title="Reconciliation model">
        <Lead>SUBMITTED ≠ COMPLETED</Lead>
        <P>A transaction can be:</P>
        <Ul items={["Submitted", "Unknown", "Confirmed", "Reverted", "Indexed", "Reconciled"]} />
        <P>Prism's UX must reflect actual canonical state.</P>
      </Section>

      <Section id="s18" n="18" title="Security model">
        <P>Assets:</P>
        <Ul
          items={[
            "User AUSD",
            "Mera authority",
            "Phone aliases",
            "Handle aliases",
            "Resolver mapping",
            "Claim authorization key",
            "Relayer balance",
            "Payment intent",
            "Activity history",
          ]}
        />
        <P>Threat actors:</P>
        <Ul
          items={[
            "SIM-swap attacker",
            "Compromised backend",
            "Malicious relayer",
            "Malicious recipient",
            "Compromised alias resolver",
            "RPC failure",
            "Malicious dApp",
            "Stolen device",
            "Enumerator / scraper",
          ]}
        />
      </Section>

      <Section id="s19" n="19" title="Security properties">
        <KV
          rows={[
            ["SP-1", "Phone possession alone cannot control existing funds."],
            ["SP-2", "No public deterministic phone directory exists."],
            ["SP-3", "A signed payment cannot change recipient or amount."],
            ["SP-4", "A completed payment cannot be replayed."],
            ["SP-5", "An unregistered-recipient claim cannot be claimed twice."],
            ["SP-6", "An expired claim cannot strand funds permanently."],
            ["SP-7", "Backend state cannot override Monad settlement truth."],
            ["SP-8", "A changed recipient identity cannot silently receive funds."],
            ["SP-9", "Submitted transactions cannot be represented as completed without confirmation."],
            ["SP-10", "Users do not need MON for supported standard payments."],
          ]}
        />
      </Section>

      <Section id="s20" n="20" title="Privacy analysis">
        <KV
          head={["Dimension", "Status"]}
          rows={[
            ["Alias privacy", "Phone number hidden from public state."],
            ["Contact privacy", "Whole address book remains local."],
            ["Transaction privacy", "Not provided."],
            ["Balance privacy", "Not provided."],
            ["Handle privacy", "Not provided by design for public handles."],
            ["Metadata privacy", "Limited; public settlement may permit transaction correlation."],
          ]}
        />
      </Section>

      <Section id="s21" n="21" title="Trust assumptions">
        <P>The v1 system trusts:</P>
        <Ul
          items={[
            "The Prism resolver not to maliciously remap aliases",
            "The OTP provider for alias-possession signals",
            "The claim-authority service to issue correct eligibility",
            "Relayer availability",
            "The Mera implementation for account authority",
            "Monad consensus for settlement",
          ]}
        />
        <P>Damage from any single failure is constrained by the separation of reachability, identity and authority.</P>
      </Section>

      <Section id="s22" n="22" title="Sponsor-native architecture">
        <Pre>{`                 PRISM

    HUMAN INTERFACE + RESOLUTION
                  │
       ┌──────────┼───────────┐
       │          │           │
      Mera       AUSD       Envio
   Authority     Money      History
       │          │           │
       └──────────┼───────────┘
                  │
                Monad
                  │
               Alchemy
           live chain access`}</Pre>
        <KV
          rows={[
            ["Mera", "Account authority."],
            ["AUSD", "The money being moved."],
            ["Envio", "Indexed history."],
            ["Monad", "Settlement."],
            ["Alchemy", "Live chain access."],
          ]}
        />
      </Section>

      <Section id="s23" n="23" title="Why Monad">
        <P>
          Prism requires onchain settlement to behave closely enough to consumer-payment expectations that the chain can
          disappear from the user's interaction model.
        </P>
        <P>Monad lets the chain sit underneath</P>
        <Pre>{`Person → Amount → Approval → Sent`}</Pre>
        <P>without forcing chain management back into the product surface.</P>
      </Section>

      <Section id="s24" n="24" title="Product economics">
        <P>No Prism token. No points required.</P>
        <P>Potential future business models, kept separate from the current implementation:</P>
        <Ul
          items={[
            "Merchant payment tools",
            "Payment-link infrastructure",
            "Premium business accounts",
            "Cross-border service fees",
            "API fees",
            "Enterprise resolution / payment APIs",
          ]}
        />
      </Section>

      <Section id="s25" n="25" title="No Prism token">
        <P>
          Prism does not require a native token to function. Consensus, gas and payment-asset responsibilities already
          belong to other primitives. Adding a token would introduce complexity without improving the core consumer
          payment loop.
        </P>
      </Section>

      <Section id="s26" n="26" title="Scope">
        <Ul
          items={[
            "iPhone · Monad · AUSD",
            "Phone aliases · @handles · QR · payment links",
            "Direct payments · payment requests",
            "Pre-user claims · refunds",
            "Activity · receipts",
            "Alias rotation · identity-change safety",
            "Mera recovery · gas abstraction",
          ]}
        />
      </Section>

      <Section id="s27" n="27" title="Explicit non-goals">
        <Ul
          items={[
            "DEX · swap app · trading",
            "NFTs · DeFi dashboard · portfolio tracker",
            "Private blockchain payments",
            "Generalized universal identity",
            "Compliance credential network",
            "Social feed · messaging network",
            "AI wallet · multi-chain account abstraction",
            "Prism token",
          ]}
        />
      </Section>

      <Section id="s28" n="28" title="Future work">
        <KV
          rows={[
            ["Private contact discovery", "OPRF / PSI based lookup."],
            ["Additional aliases", "Email or merchant identifiers."],
            ["Fiat rails", "Localized on / off ramps."],
            ["Merchants", "Human-readable merchant Prism IDs."],
            ["Payment links", "Amount-bound invoices."],
            ["Multi-device policies", "More sophisticated session management."],
            ["Privacy", "Optional private settlement layers where technically justified."],
            ["Business APIs", "Payment requests, invoices and settlement reconciliation."],
          ]}
        />
      </Section>

      <Section id="s29" n="29" title="Evidence methodology">
        <KV
          head={["Level", "Meaning"]}
          rows={[
            ["E0", "Idea"],
            ["E1", "Mocked interface"],
            ["E2", "Local executable proof"],
            ["E3", "Testnet transaction + readback"],
            ["E4", "Repeated external proof"],
            ["E5", "Production / mainnet verification"],
          ]}
        />
        <P>
          Any public Prism claim must match the achieved evidence level. “Prism supports claims” is valid as a live
          protocol capability only if a claim plus claim readback exists. “Prism uses AUSD on Monad” requires real
          configured and deployed execution proof.
        </P>
      </Section>

      <Section id="s30" n="30" title="Evaluation criteria">
        <P>Prism should prove:</P>
        <Ul
          items={[
            "Time to first payment",
            "Payment success rate",
            "Authorization → confirmation latency",
            "Claim conversion",
            "Request completion",
            "Resolver availability",
            "Indexing latency",
            "Zero-MON success",
            "Replay rejection",
            "Mutation rejection",
            "Refund completion",
          ]}
        />
      </Section>

      <Section id="s31" n="31" title="Conclusion">
        <P>
          Blockchain payment infrastructure is typically organized around accounts, while consumer payments are
          organized around people. Prism attempts to close that gap without weakening financial authority.
        </P>
        <P>
          A person may be found through a phone number, handle, QR code or link. Those identifiers remain replaceable
          reachability mechanisms. Financial authority belongs to a passkey-controlled Mera account. AUSD represents the
          value being transferred. Monad provides canonical settlement. Prism coordinates the relationship between those
          layers while keeping their complexity beneath a consumer-native interface.
        </P>
        <Lead>Find them. Pay them. Done.</Lead>
      </Section>
    </DocLayout>
  );
}
