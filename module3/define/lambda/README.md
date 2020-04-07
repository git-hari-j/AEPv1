# Lambda function for Alexa skill

**Disclaimer**: this is demo code; use if for your own benefit, being aware of all risks involved :-)

- The Lambda function for the Alexa skill is built using the [Alexa Skills Kit SDK for NodeJS v2](https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs).

- The main code for the skill, you can find in `index.js`.

- In subdirectory `apl` you find the definitions for the various Alexa screen, based on the [Alexa Presentation Language (public beta)](https://developer.amazon.com/docs/alexa-presentation-language/apl-overview.html).

- In subdirectory `event`, you will find the template definition for the experience event.

- If you make changes to the code, you can rebuild the ZIP file using the `build.sh` script.