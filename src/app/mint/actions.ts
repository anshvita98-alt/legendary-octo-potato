// src/app/mint/actions.ts
'use server';

import PinataClient from '@pinata/sdk';
import {Readable} from 'stream';

type MintFormData = {
  title: string;
  description: string;
  familyStory?: string;
};

// Helper function to convert data URL to a stream
const dataUrlToStream = (dataUrl: string) => {
  const base64 = dataUrl.split(',')[1];
  const buffer = Buffer.from(base64, 'base64');
  const stream = new Readable();
  stream.push(buffer);
  stream.push(null);
  return stream;
};

export const uploadToIpfs = async (data: MintFormData, image: string): Promise<string> => {
  if (!process.env.PINATA_API_KEY || !process.env.PINATA_API_SECRET) {
    throw new Error('Pinata API Key or Secret not set in environment variables.');
  }

  const pinata = new PinataClient(process.env.PINATA_API_KEY, process.env.PINATA_API_SECRET);

  try {
    // 1. Upload Image
    const imageStream = dataUrlToStream(image);
    const imageResult = await pinata.pinFileToIPFS(imageStream, {
      pinataMetadata: {name: `${data.title}-image`},
    });
    const imageIpfsUri = `ipfs://${imageResult.IpfsHash}`;

    // 2. Create and Upload Metadata
    const metadata = {
      name: data.title,
      description: data.description,
      story: data.familyStory,
      image: imageIpfsUri,
    };

    const metadataResult = await pinata.pinJSONToIPFS(metadata, {
      pinataMetadata: {name: `${data.title}-metadata`},
    });
    const metadataIpfsUri = `ipfs://${metadataResult.IpfsHash}`;

    return metadataIpfsUri;
  } catch (error) {
    console.error('Error uploading to Pinata:', error);
    if (error instanceof Error) {
      throw new Error(`Failed to upload to IPFS: ${error.message}`);
    }
    throw new Error('An unknown error occurred while uploading to IPFS.');
  }
};
