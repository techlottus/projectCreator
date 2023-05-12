import msal from '@azure/msal-node';
import dotenv from 'dotenv'

dotenv.config()

/**
 * Configuration object to be passed to MSAL instance on creation. 
 * For a full list of MSAL Node configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-node/docs/configuration.md 
 */
const msalConfig = {
	auth: {
		clientId: '336529a1-0688-4f78-9054-a9f6f878699f',
		authority: 'https://login.microsoftonline.com/f7ed12e4-83ce-4729-8ad5-c71f4e1b3432',
		clientSecret: 'vl18Q~D.YnYPAxIMh16Ypa6aNO50Jz2LQaTqQco3',
	}
};

/**
 * Initialize a confidential client application. For more info, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-node/docs/initialize-confidential-client-application.md
 */

const cca = new msal.ConfidentialClientApplication(msalConfig);

/* const usernamePasswordRequest = {
    scopes: ["user.read"],
    username: "jonathan.arias@lottuseducation.com", // Add your username here
    password: "Welcome2s1@", // Add your password here
}; */

/**
 * Acquires token with client credentials.
 * @param {object} tokenRequest 
 */
const getToken = async (tokenRequest, usernamePasswordRequest) => {
	//return await cca.acquireTokenByClientCredential(tokenRequest);
	return await cca.acquireTokenByUsernamePassword(usernamePasswordRequest);
}

/* module.exports = {
	apiConfig: apiConfig,
	tokenRequest: tokenRequest,
	getToken: getToken 
}; */

export default getToken;