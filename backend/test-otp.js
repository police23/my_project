const OtpModel = require('./models/otpModel');

async function testOtpModel() {
    try {
        console.log('Testing OtpModel...');

        // Test create method
        const email = 'test@example.com';
        const otp = '123456';

        console.log('Creating OTP...');
        const result = await OtpModel.create(email, otp);
        console.log('OTP created:', result);

        // Test verify method
        console.log('Verifying OTP...');
        const verified = await OtpModel.verify(email, otp);
        console.log('OTP verified:', verified);

        if (verified) {
            // Test markAsUsed method
            console.log('Marking OTP as used...');
            await OtpModel.markAsUsed(verified.id);
            console.log('OTP marked as used');
        }

        console.log('Test completed successfully');
    } catch (error) {
        console.error('Test failed:', error);
    } finally {
        process.exit();
    }
}

testOtpModel();
