import React, { Component } from 'react';
import './App.css';
import { create } from 'ipfs-http-client'
import Web3 from 'web3';
import Meme from '../abis/Meme.json'

// const ipfsClient = require('ipfs-http-client')
const ipfs = create({host: 'ipfs.infura.io', port: 5001, protocol: 'https'})  
class Blockchain extends Component {

async componentWillMount() {
  await this.loadWeb3()
  await this.loadBlockchainData()
} 
// get the account
// get the network
// get Smart Contract
// 1. ABI - Meme.abi
// 2. Address networkData.address
// Get Meme Hash

async loadBlockchainData() {
  const web3 = window.web3
  await window.ethereum.enable()
  const accounts = await web3.eth.getAccounts()
  // const accounts = await web3.eth.requestAccounts()
  this.setState({account: accounts[0] })
  console.log('All Accounts = ',accounts)
  console.log('Account = ',accounts[0])
  const networkId = await web3.eth.net.getId()
  console.log('Network Id = ',networkId)
  const networkData = Meme.networks[networkId]
  if(networkData) {
    const abi = Meme.abi
    const address = networkData.address
    // Fetch contract
    const contract = web3.eth.Contract(abi, address)
    this.setState({contract : contract})
    // console.log('Contract : ',contract)
    const memeHash = await contract.methods.get().call()
    this.setState({memeHash})
    
  } else {
    window.alert('Smart contract not deployed to detected network')
  }

}

  constructor(props) {
    super(props);
    this.state = {
      account: '',
      buffer: null,
      contract: null,
      memeHash: 'QmdnUj7rLDePGRWKiej93bam5c8WLXLhvcgjdDyYQSSVEM'
    };
   }

  async loadWeb3() {
    if(window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable() 
    } if(window.web3){
      window.web3 = new Web3(window.web3.currentProvider) 
    } else {
      window.alert('Please use metamask!')
    }
  }
  captureFile = (event) => {
    event.preventDefault()
    console.log('File Captured...')
    // process file for IPFS
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      this.setState({buffer: Buffer(reader.result)})
      // console.log('buffer', Buffer(reader.result))
    }
    console.log()
  }
  // url : https://ipfs.infura.io/ipfs/QmdnUj7rLDePGRWKiej93bam5c8WLXLhvcgjdDyYQSSVEM
  onSubmit = async (event) => {
    event.preventDefault()
    const {doc_name} = event.target.elements
     console.log('Document name: ',doc_name.value) 
    console.log('Submitting form...')
    const output = await ipfs.add(this.state.buffer, (error, result) => {
      console.log('Ipfs result', result)
      if(error){
        console.error(error)
        return
      }
    })
    console.log('r2d2', output)
    const memeHash = output.path
    // this.setState({memeHash: memeHash})

    // Step 2: Store file on Blockchain
    this.state.contract.methods.set(memeHash).send({ from: this.state.account}).then((r) => {
      console.log('send() Function called successfully!')
      this.setState({memeHash: memeHash})
    })
  }
  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="http://www.dappuniversity.com/bootcamp"
            target="_blank"
            rel="noopener noreferrer"
          >
            Welcome Student
          </a>
          <ul className="navbar-nav px-3"> 
            <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
              <small className="text-white"> {this.state.account}</small>
            </li>
          </ul>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                {/* <a
                  href="http://www.dappuniversity.com/bootcamp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={'https://ipfs.infura.io/ipfs/'+this.state.memeHash} />
                </a> */}
                <p>&nbsp;</p>
                 <h2> Upload 10th Marksheet </h2> 
                <form onSubmit={this.onSubmit}>
                  <input type='file' onChange={this.captureFile} />
                  <input type='hidden' value='tenth_marksheet' name='doc_name'/>
                  <input type='submit' name='tenth_marksheet'/>
                </form>
                <br></br>
                <h2> Upload 12th Marksheet </h2> 
                <form onSubmit={this.onSubmit}>
                  <input type='file' onChange={this.captureFile} />
                  <input type='hidden' value='twelfth_marksheet' name='doc_name'/>
                  <input type='submit' name='twelfth_marksheet' />
                </form>
                <br></br>
                <h2> Leaving Certificate </h2> 
                <form onSubmit={this.onSubmit}>
                  <input type='file' onChange={this.captureFile} />
                  <input type='hidden' value='lc' name='doc_name'/>
                  <input type='submit' name='lc'/>
                </form>
                <br></br>
                <h2>CET Scorecard </h2> 
                <form onSubmit={this.onSubmit}>
                  <input type='file' onChange={this.captureFile} />
                  <input type='hidden' value='cet' name='doc_name'/>
                  <input type='submit' name='cet'/>
                </form>
                <br></br>
                <h2> Aadhar Card </h2> 
                <form onSubmit={this.onSubmit}>
                  <input type='file' onChange={this.captureFile} />
                  <input type='hidden' value='ac' name='doc_name'/>
                  <input type='submit' name='ac'/>
                </form>
                <br></br>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default Blockchain;
