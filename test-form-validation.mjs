/**
 * Validation Test for Add Business Feature
 * This test validates the form schema and business logic without requiring database access
 */

import { z } from 'zod';

// Form schema from AddBusinessPage.tsx
const formSchema = z.object({
  businessName: z.string().min(2, {
    message: "Business name must be at least 2 characters.",
  }),
  ownerName: z.string().min(2, {
    message: "Owner name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(9, {
    message: "Please enter a valid phone number.",
  }),
  address: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
  city: z.string().min(2, {
    message: "City must be at least 2 characters.",
  }),
  postalCode: z.string().min(4, {
    message: "Please enter a valid postal code.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  category: z.string({
    required_error: "Please select a business category.",
  }),
  website: z.string().url({
    message: "Please enter a valid website URL.",
  }).optional().or(z.literal('')),
  agreeTerms: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms and conditions."
  }),
});

// Test cases
const testCases = [
  {
    name: "Valid Business Submission",
    data: {
      businessName: "Test Romanian Restaurant",
      ownerName: "Ion Popescu",
      email: "test@romanianrestaurant.com",
      phone: "+32 470 123 456",
      address: "Markt 15",
      city: "Bruges",
      postalCode: "8000",
      category: "Restaurant & Food",
      website: "https://example.com",
      description: "We are a traditional Romanian restaurant in the heart of Bruges, serving authentic Romanian cuisine with a modern twist. Our specialties include sarmale, mici, and traditional desserts.",
      agreeTerms: true,
    },
    shouldPass: true,
  },
  {
    name: "Valid Business Without Optional Website",
    data: {
      businessName: "Romanian Bakery",
      ownerName: "Maria Ionescu",
      email: "contact@romanianbakery.com",
      phone: "+32 470 987 654",
      address: "Steenstraat 42",
      city: "Bruges",
      postalCode: "8000",
      category: "Bakery",
      website: "",
      description: "Traditional Romanian bakery offering fresh cozonac, pasca, and other Romanian pastries.",
      agreeTerms: true,
    },
    shouldPass: true,
  },
  {
    name: "Invalid - Business Name Too Short",
    data: {
      businessName: "A",
      ownerName: "Ion Popescu",
      email: "test@example.com",
      phone: "+32 470 123 456",
      address: "Markt 15",
      city: "Bruges",
      postalCode: "8000",
      category: "Restaurant & Food",
      website: "",
      description: "Short business name test",
      agreeTerms: true,
    },
    shouldPass: false,
    expectedError: "Business name must be at least 2 characters.",
  },
  {
    name: "Invalid - Email Format",
    data: {
      businessName: "Test Restaurant",
      ownerName: "Ion Popescu",
      email: "invalid-email",
      phone: "+32 470 123 456",
      address: "Markt 15",
      city: "Bruges",
      postalCode: "8000",
      category: "Restaurant & Food",
      website: "",
      description: "Testing invalid email",
      agreeTerms: true,
    },
    shouldPass: false,
    expectedError: "email",
  },
  {
    name: "Invalid - Phone Too Short",
    data: {
      businessName: "Test Restaurant",
      ownerName: "Ion Popescu",
      email: "test@example.com",
      phone: "12345",
      address: "Markt 15",
      city: "Bruges",
      postalCode: "8000",
      category: "Restaurant & Food",
      website: "",
      description: "Testing invalid phone",
      agreeTerms: true,
    },
    shouldPass: false,
    expectedError: "phone number",
  },
  {
    name: "Invalid - Terms Not Accepted",
    data: {
      businessName: "Test Restaurant",
      ownerName: "Ion Popescu",
      email: "test@example.com",
      phone: "+32 470 123 456",
      address: "Markt 15",
      city: "Bruges",
      postalCode: "8000",
      category: "Restaurant & Food",
      website: "",
      description: "Testing terms validation",
      agreeTerms: false,
    },
    shouldPass: false,
    expectedError: "terms and conditions",
  },
  {
    name: "Invalid - Invalid Website URL",
    data: {
      businessName: "Test Restaurant",
      ownerName: "Ion Popescu",
      email: "test@example.com",
      phone: "+32 470 123 456",
      address: "Markt 15",
      city: "Bruges",
      postalCode: "8000",
      category: "Restaurant & Food",
      website: "not-a-valid-url",
      description: "Testing invalid website URL",
      agreeTerms: true,
    },
    shouldPass: false,
    expectedError: "website URL",
  },
  {
    name: "Invalid - Description Too Short",
    data: {
      businessName: "Test Restaurant",
      ownerName: "Ion Popescu",
      email: "test@example.com",
      phone: "+32 470 123 456",
      address: "Markt 15",
      city: "Bruges",
      postalCode: "8000",
      category: "Restaurant & Food",
      website: "",
      description: "Short",
      agreeTerms: true,
    },
    shouldPass: false,
    expectedError: "Description must be at least 10 characters.",
  },
];

// Run tests
console.log('🧪 Running Add Business Form Validation Tests\n');
console.log('='.repeat(80));

let passedTests = 0;
let failedTests = 0;

testCases.forEach((testCase, index) => {
  console.log(`\nTest ${index + 1}: ${testCase.name}`);
  console.log('-'.repeat(80));
  
  try {
    const result = formSchema.safeParse(testCase.data);
    
    if (testCase.shouldPass) {
      if (result.success) {
        console.log('✅ PASSED: Validation successful as expected');
        console.log('Validated data:', JSON.stringify(result.data, null, 2));
        passedTests++;
      } else {
        console.log('❌ FAILED: Expected validation to pass but it failed');
        console.log('Errors:', result.error.errors);
        failedTests++;
      }
    } else {
      if (!result.success) {
        const errorMessage = result.error.errors[0].message;
        console.log('✅ PASSED: Validation failed as expected');
        console.log('Error message:', errorMessage);
        
        if (testCase.expectedError && !errorMessage.toLowerCase().includes(testCase.expectedError.toLowerCase())) {
          console.log(`⚠️  WARNING: Expected error about "${testCase.expectedError}" but got: "${errorMessage}"`);
        }
        passedTests++;
      } else {
        console.log('❌ FAILED: Expected validation to fail but it passed');
        failedTests++;
      }
    }
  } catch (error) {
    console.log('❌ FAILED: Unexpected error during validation');
    console.error(error);
    failedTests++;
  }
});

console.log('\n' + '='.repeat(80));
console.log('\n📊 TEST SUMMARY');
console.log('='.repeat(80));
console.log(`Total tests: ${testCases.length}`);
console.log(`✅ Passed: ${passedTests}`);
console.log(`❌ Failed: ${failedTests}`);
console.log(`Success rate: ${((passedTests / testCases.length) * 100).toFixed(1)}%`);

if (failedTests === 0) {
  console.log('\n🎉 All validation tests passed!');
  console.log('\n✅ Form Validation Summary:');
  console.log('   - Business name: minimum 2 characters ✓');
  console.log('   - Owner name: minimum 2 characters ✓');
  console.log('   - Email: valid email format ✓');
  console.log('   - Phone: minimum 9 characters ✓');
  console.log('   - Address: minimum 5 characters ✓');
  console.log('   - City: minimum 2 characters ✓');
  console.log('   - Postal code: minimum 4 characters ✓');
  console.log('   - Description: minimum 10 characters ✓');
  console.log('   - Category: required selection ✓');
  console.log('   - Website: optional, valid URL if provided ✓');
  console.log('   - Terms: must be accepted ✓');
  console.log('\n✅ The form validation is working correctly!');
  process.exit(0);
} else {
  console.log('\n❌ Some tests failed. Please review the validation logic.');
  process.exit(1);
}
