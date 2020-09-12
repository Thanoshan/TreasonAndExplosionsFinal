//pulls assets from files
const ASSET_NAMES = [
  'ship.svg',
  'ship1.svg',
  'ship2.svg',
  'ship3.svg',
  'ship4.svg',
  'ship5.svg',
  'bullet.svg',
];

const sprites = {};

const downloadPromise = Promise.all(ASSET_NAMES.map(downloadAsset));

//downloads assets and allows them to be used in the game
function downloadAsset(assetName) {
  return new Promise(resolve => {
    const asset = new Image();
    asset.onload = () => {
      console.log(`DOWNLOAD >> ${assetName}`);
      sprites[assetName] = asset;
      resolve();
    };
    asset.src = `/assets/${assetName}`;
  });
}

export const downloadAssets = () => downloadPromise;

export const getAsset = assetName => sprites[assetName];
