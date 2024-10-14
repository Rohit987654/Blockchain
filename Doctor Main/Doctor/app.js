// Web3 and Contract setup
const contractAddress = '0xAD990391E481320faB2a60A7bF0485F2FD007ca9'; // Replace with your contract address
const contractABI = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "doctorId",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "isApproved",
				"type": "bool"
			},
			{
				"internalType": "string",
				"name": "reason",
				"type": "string"
			}
		],
		"name": "approveDoctor",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "doctorId",
				"type": "uint256"
			}
		],
		"name": "deleteDoctorRecord",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "doctorId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "isApproved",
				"type": "bool"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "reason",
				"type": "string"
			}
		],
		"name": "DoctorApproved",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "doctorId",
				"type": "uint256"
			}
		],
		"name": "DoctorDeleted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "doctorId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			}
		],
		"name": "DoctorRegistered",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "doctorId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "specialty",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "licenseNumber",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "certificationDetails",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "hospital",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "yearsOfExperience",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "contactNumber",
				"type": "uint256"
			}
		],
		"name": "registerDoctor",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "doctors",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "doctorId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "specialty",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "licenseNumber",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "certificationDetails",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "hospital",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "yearsOfExperience",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "contactNumber",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "isRegistered",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "isApproved",
				"type": "bool"
			},
			{
				"internalType": "string",
				"name": "reasonForRejection",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "doctorId",
				"type": "uint256"
			}
		],
		"name": "viewDoctor",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "specialty",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "licenseNumber",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "certificationDetails",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "hospital",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "yearsOfExperience",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "contactNumber",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "isApproved",
				"type": "bool"
			},
			{
				"internalType": "string",
				"name": "reasonForRejection",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

let web3;
let contract;

// Initialize Web3 and Contract
function initializeWeb3() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        ethereum.request({ method: 'eth_requestAccounts' }).catch(console.error);
    } else {
        alert("No Ethereum provider detected. Please install MetaMask.");
        return;
    }

    contract = new web3.eth.Contract(contractABI, contractAddress);
}

// Admin Functions
function registerDoctor(event) {
    event.preventDefault();
    initializeWeb3();

    const doctorId = document.getElementById('doctorId').value;
    const name = document.getElementById('name').value;
    const specialty = document.getElementById('specialty').value;
    const licenseNumber = document.getElementById('licenseNumber').value;
    const certificationDetails = document.getElementById('certificationDetails').value;
    const hospital = document.getElementById('hospital').value;
    const yearsOfExperience = document.getElementById('yearsOfExperience').value;
    const contactNumber = document.getElementById('contactNumber').value;

    web3.eth.getAccounts().then(accounts => {
        contract.methods.registerDoctor(
            doctorId, name, specialty, licenseNumber, certificationDetails,
            hospital, yearsOfExperience, contactNumber
        ).send({ from: accounts[0] })
        .then(() => {
            alert('Doctor registered successfully!');
        })
        .catch(error => {
            console.error(error);
            alert("Error registering doctor. Check the console for more information.");
        });
    });
}

function viewDoctor(event) {
    event.preventDefault();
    initializeWeb3();

    const doctorId = document.getElementById('viewDoctorId').value;

    contract.methods.viewDoctor(doctorId).call()
        .then(result => {
            const status = result.isApproved ? 'Approved' : 'Rejected';
            const doctorDetails = `
                <p><strong>Doctor ID:</strong> ${result.id}</p>
                <p><strong>Name:</strong> ${result.name}</p>
                <p><strong>Specialty:</strong> ${result.specialty}</p>
                <p><strong>License Number:</strong> ${result.licenseNumber}</p>
                <p><strong>Certification Details:</strong> ${result.certificationDetails}</p>
                <p><strong>Hospital:</strong> ${result.hospital}</p>
                <p><strong>Years of Experience:</strong> ${result.yearsOfExperience}</p>
                <p><strong>Contact Number:</strong> ${result.contactNumber}</p>
                <p><strong>Approval Status:</strong> ${status}</p>
                <p><strong>Reason for Rejection:</strong> ${result.reasonForRejection || 'N/A'}</p>
            `;
            document.getElementById('doctorDetails').innerHTML = doctorDetails;
        })
        .catch(error => {
            console.error(error);
            alert("Error fetching doctor details. Check the console for more information.");
        });
}

function alterDoctor(event) {
    event.preventDefault();
    // Get the action from the clicked button
    const action = event.submitter.getAttribute('onclick').replace("alterDoctorButton('", "").replace("')", "");
    alterDoctorButton(action);
}

function alterDoctorButton(action) {
    initializeWeb3();

    const doctorId = document.getElementById('alterDoctorId').value;
    const reason = document.getElementById('reasonForRejection').value;

    web3.eth.getAccounts().then(accounts => {
        if (action === 'approve') {
            contract.methods.approveDoctor(doctorId, true, "").send({ from: accounts[0] })
                .then(() => {
                    alert('Doctor approved successfully!');
                })
                .catch(error => {
                    console.error(error);
                    alert("Error approving doctor. Check the console for more information.");
                });
        } else if (action === 'reject') {
            contract.methods.approveDoctor(doctorId, false, reason).send({ from: accounts[0] })
                .then(() => {
                    alert('Doctor rejected successfully!');
                })
                .catch(error => {
                    console.error(error);
                    alert("Error rejecting doctor. Check the console for more information.");
                });
        } else if (action === 'delete') {
            contract.methods.deleteDoctorRecord(doctorId).send({ from: accounts[0] })
                .then(() => {
                    alert('Doctor record deleted successfully!');
                })
                .catch(error => {
                    console.error(error);
                    alert("Error deleting doctor record. Check the console for more information.");
                });
        }
    });
}

// User Functions
function searchDoctorButton() {
    initializeWeb3();

    const doctorName = document.getElementById('doctorNameInput').value;

    // Assuming `searchDoctorByName` function is available in your contract
    contract.methods.searchDoctorByName(doctorName).call()
        .then(result => {
            const doctorDetails = `
                <p><strong>Doctor ID:</strong> ${result.doctorId}</p>
                <p><strong>Name:</strong> ${result.name}</p>
                <p><strong>Specialty:</strong> ${result.specialty}</p>
                <p><strong>License Number:</strong> ${result.licenseNumber}</p>
                <p><strong>Certification Details:</strong> ${result.certificationDetails}</p>
                <p><strong>Hospital:</strong> ${result.hospital}</p>
                <p><strong>Years of Experience:</strong> ${result.yearsOfExperience}</p>
                <p><strong>Contact Number:</strong> ${result.contactNumber}</p>
            `;
            document.getElementById('doctorDetails').innerHTML = doctorDetails;
        })
        .catch(error => {
            console.error(error);
            alert("Error searching for doctor. Check the console for more information.");
        });
}

function viewVerificationStatusButton() {
    initializeWeb3();

    const doctorId = document.getElementById('doctorIdInput').value;

    contract.methods.viewDoctor(doctorId).call()
        .then(result => {
            const status = result.isApproved ? 'Approved' : 'Rejected';
            const verificationStatus = `
                <p><strong>Approval Status:</strong> ${status}</p>
                <p><strong>Reason for Rejection:</strong> ${result.reasonForRejection || 'N/A'}</p>
            `;
            document.getElementById('verificationStatus').innerHTML = verificationStatus;
        })
        .catch(error => {
            console.error(error);
            alert("Error fetching verification status. Check the console for more information.");
        });
}


