# Payment Files Naming Convention Proposal

## Current Files Analysis

### Current Naming Issues:
1. ❌ **Inconsistent casing**: `paymentMethodCardDesign.jsx` (lowercase 'p')
2. ❌ **Too verbose**: `PaymentResultInConfirmAppointment.jsx` (too long)
3. ❌ **Unclear distinction**: `PaymentCardHeader` vs `PaymentPageHeader`
4. ❌ **Generic names**: `PaymentMethod` could be more specific

## Recommended Naming Convention

### Rules:
1. ✅ **PascalCase** for all component files
2. ✅ **Descriptive but concise** names (max 3-4 words)
3. ✅ **Consistent prefixes** for related components
4. ✅ **Suffixes** to indicate component type (Card, Header, Form, etc.)

## Proposed File Renames

| Current Name | Proposed Name | Reason |
|-------------|--------------|---------|
| `paymentMethodCardDesign.jsx` | `PaymentMethodCard.jsx` | Fix casing, more concise, clear it's a card component |
| `PaymentMethod.jsx` | `PaymentMethodList.jsx` or `PaymentMethodSelector.jsx` | More specific - shows it's a list/selector |
| `PaymentCardHeader.jsx` | `PaymentMethodHeader.jsx` | More accurate - it's for payment method selection |
| `PaymentPageHeader.jsx` | `PaymentPageBrandHeader.jsx` or `PaymentPageTitle.jsx` | More specific - shows clinic branding |
| `PaymentResultInConfirmAppointment.jsx` | `PaymentStatusMessage.jsx` | Much shorter, clearer purpose |
| `ConfirmPayment.jsx` | `PaymentConfirmation.jsx` or `PaymentHandler.jsx` | More descriptive |
| `AppointmentSummary.jsx` | `AppointmentSummaryCard.jsx` | Add suffix to indicate it's a card |
| `SecurityMessage.jsx` | `PaymentSecurityMessage.jsx` | Add prefix for context |
| `Stripe/StripeProvider.jsx` | ✅ Keep as is | Already well-named |

## Recommended Final Structure

```
src/features/paymentMethods/
├── PaymentMethodCard.jsx          (was: paymentMethodCardDesign.jsx)
├── PaymentMethodSelector.jsx      (was: PaymentMethod.jsx)
├── PaymentMethodHeader.jsx        (was: PaymentCardHeader.jsx)
├── PaymentPageTitle.jsx           (was: PaymentPageHeader.jsx)
├── PaymentStatusMessage.jsx       (was: PaymentResultInConfirmAppointment.jsx)
├── PaymentConfirmation.jsx        (was: ConfirmPayment.jsx)
├── AppointmentSummaryCard.jsx     (was: AppointmentSummary.jsx)
├── PaymentSecurityMessage.jsx     (was: SecurityMessage.jsx)
└── Stripe/
    └── StripeProvider.jsx         (keep as is)
```

## Alternative Naming (More Grouped)

If you prefer more grouped naming with prefixes:

```
src/features/paymentMethods/
├── PaymentMethodCard.jsx
├── PaymentMethodSelector.jsx
├── PaymentMethodHeader.jsx
├── PaymentPageTitle.jsx
├── PaymentStatusMessage.jsx
├── PaymentConfirmation.jsx
├── PaymentAppointmentSummary.jsx  (alternative)
├── PaymentSecurityMessage.jsx
└── Stripe/
    └── StripeProvider.jsx
```

## Benefits

1. ✅ **Consistency**: All files use PascalCase
2. ✅ **Clarity**: Names clearly indicate component purpose
3. ✅ **Maintainability**: Easier to find and understand components
4. ✅ **Convention**: Follows React/JavaScript naming best practices
5. ✅ **Scalability**: Easy to add new payment-related components

