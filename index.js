const morgan = require('morgan');
const express = require('express');
const multer = require('multer');
const path = require('path');
const knex = require('knex');


/**
 * Express app initialisation
 */

// Create express object
const app = express();

// Set middlewares
app.use(express.json());
app.use(morgan('dev'));

// Run express server
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`app is running on ${PORT}`);
});

app.get("/api", (req, res) => {
    res.json({ message: "Hello from Express!" });
});

app.get('/', function (req, res) {
    console.log(__dirname, path.join(__dirname, '../studio-frontend/public/index.html'));
    res.sendFile(path.join(__dirname, '../studio-frontend/public'));
});

/**
 * End: Express app initialisation
 */

/**
 * Initialise up DB and image multer
 */
// BEFORE: Create mutler object
const imageUpload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'images/');
        },
        filename: function (req, file, cb) {
            cb(null, new Date().valueOf() + '_' + file.originalname);
        }
    })
});

// Create database object
const db = knex(
    {
        client: 'pg',
        connection: {
            host: '127.0.0.1',
            user: 'rimjhimsudhesh',
            password: 'AamDancer@123',
            database: 'image_upload',

        },
    }
);
/**
 * END: Initialise up DB and image multer
 */

/* AFTER: Create Mutler object
const imageUpload = mutler({
    storage: multer.diskStorage(
        {
            destination: function (req, file, cb) {
                cb(null, 'images/');
            },
            filename: function (req, file, cb) {
                cb(
                    null,
                    new Date().valueOf() + 
                    '_' +
                    file.originalname
                );
            }
        }
    ), 
})*/

// @TODO Add routes
// Image Upload Routes
app.post('/image', imageUpload.array('image'), async (req, res) => {
    const files = req.files;
    console.log("Files array: ---- \n", files)
    try {
        await Promise.all(files.map(async file => {
            const { filename, mimetype, size } = file;
            const filepath = file.path;
            await db.insert({ filename, filepath, mimetype, size }).into('image_files');
        }));
        res.json({ success: true, files: files.map(file => file.filename) });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Upload failed', stack: err.stack });
    }

    /*Promise.all(files.map(async file => {
        const { filename, mimetype, size } = file;
        const filepath = file.path;

        try {
            await db.insert({
                filename,
                filepath,
                mimetype,
                size,
            }).into('image_files');
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: 'Upload failed',
                stack: err.stack,
            });
        }

    }))
        .then(() => {
            res.json({ success: true, files: files.map(files => file.filename) });
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                message: 'Upload failed',
                stack: err.stack,
            });
        });*/
});

// Image Get Routes
app.get('/image/:filename', (req, res) => {
    const { filename } = req.params;
    db
        .select('*')
        .from('image_files')
        .where({ filename })
        .then(images => {
            if (images[0]) {
                const dirname = path.resolve();
                const fullfilepath = path.join(
                    dirname,
                    images[0].filepath);
                return res
                    .type(images[0].mimetype)
                    .sendFile(fullfilepath);
            }
            return Promise.reject(
                new Error('Image does not exist')
            );
        })
        .catch(err => res
            .status(404)
            .json(
                {
                    success: false,
                    message: 'not found',
                    stack: err.stack,
                }
            ),



        );
});