/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Gateway, Wallets } = require('fabric-network');
const fs = require('fs');
const path = require('path');

async function main() {
    try {
        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get('appUser');
        if (!identity) {
            console.log('An identity for the user "appUser" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'appUser', discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('fabcar');

        // Submit the specified transaction.

        // await contract.submitTransaction("writeData" , "2", "JB");
        // console.log('Transaction has been submitted');

        var key = 1
        var value = {
            name : "Sobi",
            age  : 10,
            class : "poor"
        }

        var key2 = 2
        var value2 = {
            name : "CAOS",
            age  : 17,
            class : "poor"
        }

        var key3 = 3
        var value3 = {
            name : "PM",
            age  : 14,
            class : "poor"
        }

        var key4 = 4
        var value4 = {
            name : "TB",
            age  : 12,
            class : "rich"
        }

        var key5 = 5
        var value5 = {
            name : "JB",
            age  : 19,
            class : "rich"
        }

    
        await contract.submitTransaction("writeStructData" , key, JSON.stringify(value));
        await contract.submitTransaction("writeStructData" , key2, JSON.stringify(value2));
        await contract.submitTransaction("writeStructData" , key3, JSON.stringify(value3));
        await contract.submitTransaction("writeStructData" , key4, JSON.stringify(value4));
        await contract.submitTransaction("writeStructData" , key5, JSON.stringify(value5));
        console.log('Transaction has been submitted');

        // Disconnect from the gateway.
        await gateway.disconnect();

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
}

main();
