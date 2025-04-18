// backpack.config.js
// IMPORTANT: This file is not going through babel transformation.
// You can however use the ES2015 features supported by your Node.js version.

// module.exports = {
//     webpack: (config, options, webpack) => {
//         config.entry.main=['./server.js'];
//         return config;
//       }
// };


module.exports = {
    presets: ['backpack-core/babel', 'stage-0'],
    webpack: (config, options, webpack) => {
        if(webpack) {
            //  console.log('');
        }
        config.entry.main = ['./server.js'];
  
        return config;
    }
  };