const Moralis = require("moralis").default;
const fs = require("fs");
var path = require("path");

async function uploadToIpfs() {
  await Moralis.start({
    apiKey: "KEY",
  });
  const length = fs.readdirSync(
    path.join(__dirname, "..", "build", "images")
  ).length;
  const uploadArray = [];
  for (let i = 1; i <= length; i++) {
    uploadArray.push({
      path: `${i}.png`,
      content: fs.readFileSync(
        path.join(__dirname, "..", "build", "images", `${i}.png`),
        { encoding: "base64" }
      ),
    });
  }

  const response = await Moralis.EvmApi.ipfs.uploadFolder({
    abi: uploadArray,
  });

  console.log(response.result);
}

uploadToIpfs();
