/*!
 * CountriesController.js
 * Containing all the controller actions related to `User Profile`
 * Author: Doli Dua
 * Date: 28th MAY, 2024`
 * MIT Licensed
 */
/**
 * Module dependencies.
 * @private
 */

// ################################ Repositories ################################ //
require("dotenv").config();
const mongoose = require('mongoose');

const PostRepo = require('../../repositories/PostRepo');
const ReportRepo = require('../../repositories/ReportRepo');
const PostReportRepo = require('../../repositories/PostReportRepo');
const FollowersRepo = require('../../repositories/UserFollowersRepo');
const UserRepo = require('../../repositories/userRepo');
const PlaceRecommendedRepo = require('../../repositories/PlaceRecomendedRepo');
const Commonfunction = require('../../helpers/uploadFile');
const HashTagRepo = require('../../repositories/HashTagRepo');
const PostHashTagRepo = require('../../repositories/PostHashTagRepo');
const uploadFile = require('../../helpers/uploadFile');

// ################################ Response Messages ################################ //
const responseMessages = require('../../responseMessages');

const axios = require('axios');
var NodeGeocoder = require('node-geocoder');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const { uploadS3VideoFile } = require('../../helpers/uploadFile');

const { PassThrough } = require('stream');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs').promises;
const fss = require('fs');
const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

/*
|------------------------------------------------ 
| API name          :  homePage
| Response          :  Respective response message in JSON format
| Logic             :  homePage
| Request URL       :  BASE_URL/api/
| Request method    :  GET
| Author            :  SAYAN DE
|------------------------------------------------
*/
module.exports.postCreate = (req, res) => {
    (async () => {
        let purpose = "Post create ";
        try {
            let userID = req.headers.userID;
            let body = req.body;

            const location = {
                type: "Point",
                coordinates: [
                    parseFloat(body.lat),
                    parseFloat(body.long),
                ],
            }

            let content = [];

            body.content.forEach(element => {
                content.push({
                    file: element.file,
                    file_type: element.file_type,
                    thumbnail: element.thumbnail
                })
            });

            let createData = {
                user_id: userID,
                title: body.title,
                content: content,
                like_count: "0",
                dislike_count: "0",
                comment_count: "0",
                share_count: "0",
                view_count: "0",
                report_count: "0",
                type: body.type,
                is_delete: "0",
                add_location: location
            }

            let postcreate = await PostRepo.create(createData);

            body.hash_tag.forEach(async element => {
                let findHashTag = await HashTagRepo.findOne({ tag_name: element });

                if (!findHashTag) {
                    let createHashTag = await HashTagRepo.create({ tag_name: element });
                    let createPostHashtags = await PostHashTagRepo.create({ post_id: postcreate._id, user_id: userID, hash_tag_id: createHashTag._id })
                } else {
                    let createPostHashtags = await PostHashTagRepo.create({ post_id: postcreate._id, user_id: userID, hash_tag_id: findHashTag._id });
                }
            });



            return res.send({
                status: 200,
                msg: "Post create successfully",
                data: {},
                purpose: purpose
            });
        }
        catch (err) {
            console.log("Post create Error : ", err);
            return res.send({
                status: 500,
                msg: responseMessages.serverError,
                data: {},
                purpose: purpose
            })
        }
    })()
}

/*
|------------------------------------------------ 
| API name          :  uploadRecommendedPlaceImages
| Response          :  Respective response message in JSON format
| Logic             :  uploadRecommendedPlaceImages
| Request URL       :  BASE_URL/api/
| Request method    :  GET
| Author            :  SAYAN DE
|------------------------------------------------
*/

// module.exports.uploadMp4 = (req, res) => {
//     (async () => {
//         let purpose = "Upload MP4 and Convert to HLS";
//         try {
//             const file = req.file;

//             const fileName = path.parse(file.originalname).name;

//             let mainOutputDir = 'uploads/' + fileName + '_' + Date.now();
//             let result;

//             await new Promise((resolve, reject) => {
//                 ffmpeg(file.path)
//                     .on('filenames', (filenames) => {
//                         console.log('Will generate ' + filenames.join(', '));
//                     })
//                     .on('end', () => {
//                         console.log('Screenshots taken');
//                         resolve();
//                     })
//                     .screenshots({
//                         count: 1,
//                         folder: mainOutputDir,
//                         filename: fileName + '_thumbnail.jpg',
//                         size: '320x240'
//                     });
//             });

//             await fs.mkdir(mainOutputDir, { recursive: true });

//             const resolutions = [
//                 // { resolution: '7680x4320', directory: '8K or 4320p' },
//                 // { resolution: '3840x2160', directory: '4K or 2160p' },
//                 // { resolution: '2560x1440', directory: '2k or 1440' },
//                 { resolution: '1920x1080', directory: '1080p' },
//                 { resolution: '1280x720', directory: '720p' },
//                 { resolution: '854x480', directory: '480p' },
//                 { resolution: '640x360', directory: '360p' },
//                 { resolution: '426x240', directory: '240p' },
//                 { resolution: '256x144', directory: '144p' }
//             ];

//             let convertedFiles = [];

//             await Promise.all(resolutions.map(async (resolutionObj) => {
//                 const resolutionDir = path.join(mainOutputDir, resolutionObj.directory);
//                 const outputPath = path.join(resolutionDir, fileName + '.m3u8');


//                 await fs.mkdir(resolutionDir, { recursive: true });

//                 await new Promise((resolve, reject) => {
//                     ffmpeg(file.path)
//                         .outputOptions('-preset veryfast')
//                         .outputOptions('-hls_time 10')
//                         .size(resolutionObj.resolution)
//                         .output(outputPath)
//                         .on('end', () => {
//                             console.log(`Conversion to ${resolutionObj.resolution} finished`,);
//                             convertedFiles.push({ resolution: resolutionObj.resolution, path: outputPath });
//                             resolve();
//                         })
//                         .on('error', (err) => {
//                             console.error(`Error converting to ${resolutionObj.resolution}:`, err);
//                             reject(err);
//                         })
//                         .run();

//                     });
//             }));

//             const directoryPath = './' + mainOutputDir;
//             let i = 0;
//             console.log(directoryPath, 'directoryPath')
//             new Promise((resolve, reject) => {
//                 fss.readdirSync(directoryPath).forEach(async file => {

//                     const ds = './' + mainOutputDir + '/' + file;
//                     console.log('---------------------------', ds);
//                     let array = [];
//                     if (file.split('.jpg')[1] == undefined) {
//                         fss.readdirSync(ds).forEach(f => {
//                             array.push(f);
//                         })
//                         result = await uploadFile.uploadS3VideoFileS(array, fileName, file,ds);

//                     } else{
//                         result = await uploadFile.uploadS3Thubnail(file, fileName); 
//                     }

//                 });

//                 resolve(true)
//             });

//             // console.log(array,'array');
//             // 

//             return res.status(200).send({
//                 status: 200,
//                 msg: 'MP4 uploaded and processed successfully',
//                 data: {
//                     result,
//                     convertedFiles: convertedFiles,
//                 },
//                 purpose: purpose
//             });
//         } catch (err) {
//             console.error("Error uploading MP4: ", err);
//             return res.status(500).send({
//                 status: 500,
//                 msg: 'Failed to process the MP4 file',
//                 data: {},
//                 purpose: purpose
//             });
//         }
//     })();
// };

module.exports.uploadMp4 = (req, res) => {
    (async () => {
        let purpose = "Upload Post Image/Video";
        try {
            console.log(req.file, 'req.file')
            if (req.file !== undefined) {
                let files = JSON.parse(JSON.stringify(req.file));
                console.log(files, 'files')
                let imgFilePath = [];
                let videoFilePath = [];
                let thumbnailPath = [];
                let promiseall = [];

                promiseall.push(
                    new Promise(async (resolve, reject) => {
                        let value = req.file;
                        //  for (const value of Object.values(files)) {
                        console.log(value, 'value')

                        let extension = path.extname(value.filename).toLowerCase();

                        if (extension === '.jpeg' || extension === '.jpg' || extension === '.png' || extension === '.svg') {
                            imgFilePath.push(`${global.constants.post_image_url}/${value.filename}`);
                            resolve();
                        } else if (extension === '.mp4' || extension === '.mov') {
                            let convertedFiles = [];
                            let videoFile = value.path
                            // fss.mkdirSync('uploads/Post_Thumbnail', { recursive: true });

                            // await new Promise((resolve, reject) => {
                            //     ffmpeg(videoFile)
                            //         .on('filenames', (filenames) => {
                            //             console.log('Will generate ' + filenames.join(', '));
                            //         })
                            //         .on('end', () => {
                            //             console.log('Screenshots taken');
                            //             resolve();
                            //         })
                            //         .screenshots({
                            //             timestamps: ['0%'],
                            //             count: 1,
                            //             folder: 'uploads/Post_Thumbnail',
                            //             filename: 'Post_Thumbnail' + Date.now() + '.jpg'
                            //         });
                            // });



                            // const resolutions = [
                            //     // { resolution: '7680x4320', directory: '8K or 4320p' },
                            //     // { resolution: '3840x2160', directory: '4K or 2160p' },
                            //     // { resolution: '2560x1440', directory: '2k or 1440' },
                            //     { resolution: '1920x1080', directory: '1080p' },
                            //     { resolution: '1280x720', directory: '720p' },
                            //     { resolution: '854x480', directory: '480p' },
                            //     { resolution: '640x360', directory: '360p' },
                            //     { resolution: '426x240', directory: '240p' }
                            // ];

                          
                            // let mainOutputDir = './uploads/' + value.filename + '_' + Date.now();
                            // fss.mkdirSync(mainOutputDir, { recursive: true });

                            // await Promise.all(resolutions.map(async (resolutionObj) => {
                            //     const resolutionDir = path.join(mainOutputDir, resolutionObj.directory);
                            //     const outputPath = path.join(resolutionDir, value.filename.split('.')[0] + '.m3u8');


                            //     fss.mkdirSync(resolutionDir, { recursive: true });

                            //     await new Promise((resolve, reject) => {
                            //         ffmpeg(videoFile)
                            //             .addOptions([
                            //                 `-s ${resolutionObj.resolution}`, // Set the resolution
                            //                 '-profile:v baseline', // HLS requires a baseline profile
                            //                 '-level 3.0',
                            //                 '-start_number 0',
                            //                 '-hls_time 10', // Segment duration
                            //                 '-hls_list_size 0', // Maximum number of playlist entries (0 for unlimited)
                            //                 '-f hls', // Format to HLS
                            //             ])
                            //             .output(outputPath)
                            //             .on('end', () => {
                            //                 console.log(`Conversion to ${resolutionObj.resolution} finished`);
                            //                 convertedFiles.push({ resolution: resolutionObj.resolution, path: outputPath });
                            //                 resolve();
                            //             })
                            //             .on('error', (err) => {
                            //                 console.error(`Error converting to ${resolutionObj.resolution}:`, err);
                            //                 reject(err);
                            //             })
                            //             .run();
                            //     });
                            // }));

                            const directoryPath = mainOutputDir;
                            let i = 0;

                            // new Promise((resolve, reject) => {
                            //     fss.readdirSync(directoryPath).forEach(async file => {

                            //         const ds = mainOutputDir + '/' + file;
                            //         console.log('---------------------------', file.split('.jpg')[1]);
                            //         let array = [];
                            //         if (file.split('.jpg')[1] == undefined){
                                    //     fss.readdirSync(ds).forEach(f => {
                                    //         array.push(f);
                                    //     })
                                    // let result = await uploadFile.uploadS3VideoFileS(array, value.originalname, file, directoryPath);
                                    // console.log(result, 'result')
                                   // }
                                    // else{
                                    //     fss.readdirSync(ds).forEach(f => {
                                    //         array.push(f);
                                    //     })
                                    // let result = await uploadFile.uploadS3VideoFileS(array, 'sample5', file, directoryPath);
                                    // console.log(result, 'result')
                                    // }
                                        
                            //     });
                            //     resolve(true)
                            // });

                        }
                        //}
                        resolve(true);
                    })
                )

                Promise.all(promiseall).then(() => {
                    return res.send({
                        status: 200,
                        msg: 'file upload successfully',
                        data: {
                            image: imgFilePath,
                            video: videoFilePath,
                            thumbnail: thumbnailPath
                        },
                        purpose: purpose
                    })
                })
            } else {
                return res.send({
                    status: 404,
                    msg: responseMessages.noFileFOund,
                    data: {},
                    purpose: purpose
                })
            }
        } catch (err) {
            console.log("Upload Daily Image ERROR : ", err);
            return res.send({
                status: 500,
                msg: responseMessages.serverError,
                data: {},
                purpose: purpose,
            });
        }
    })();
};

/*
|------------------------------------------------ 
| API name          :  homePage
| Response          :  Respective response message in JSON format
| Logic             :  homePage
| Request URL       :  BASE_URL/api/
| Request method    :  GET
| Author            :  SAYAN DE
|------------------------------------------------
*/
module.exports.reportList = (req, res) => {
    (async () => {
        let purpose = "Report list";
        try {
            let userID = req.headers.userID;
            
            let reportList = await ReportRepo.findAll()
            return res.send({
                status: 200,
                msg: "report list fetch successfully",
                data: reportList,
                purpose: purpose
            });
        }
        catch (err) {
            console.log("Error : ", err);
            return res.send({
                status: 500,
                msg: responseMessages.serverError,
                data: {},
                purpose: purpose
            })
        }
    })()
}

/*
|------------------------------------------------ 
| API name          :  homePage
| Response          :  Respective response message in JSON format
| Logic             :  homePage
| Request URL       :  BASE_URL/api/
| Request method    :  GET
| Author            :  SAYAN DE
|------------------------------------------------
*/
module.exports.postReport = (req, res) => {
    (async () => {
        let purpose = "Report post";
        try {
            let userID = req.headers.userID;
            let body = req.body;
            
            let reportCreate = {
                user_id: userID,
                post_id: body.post_id,
                report_id: body.report_id,
                remarks: body.remarks
            }
            let report = await PostReportRepo.create(reportCreate)
            return res.send({
                status: 200,
                msg: "report submit successfully",
                data: {},
                purpose: purpose
            });
        }
        catch (err) {
            console.log("Error : ", err);
            return res.send({
                status: 500,
                msg: responseMessages.serverError,
                data: {},
                purpose: purpose
            })
        }
    })()
}