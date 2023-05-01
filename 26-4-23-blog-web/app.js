const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const _ = require('lodash')

const homeStartingContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vel faucibus velit. Pellentesque est elit, egestas dui id, tempor accumsan semper ac. Cras neque ligula, iaculis nec quam sit amet, venenatis luctus elit. Ut vitae augue ac tellus ultricies sollicitudin. Aliquam erat volutpat. Sed eu augue id lectus aliquam scelerisque. Donec pretium vulputate sapien. Nullam rhoncus urna nec velit vehicula, vitae mollis tellus tincidunt. Sed vestibulum tortor id ex congue tincidunt. Sed mollis urna vitae mi tristique tincidunt.'
const aboutContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eget augue eget nulla ullamcorper commodo vel vel ipsum. Mauris eget vestibulum risus, vel bibendum metus. Sed faucibus risus vel augue suscipit, eget hendrerit ipsum accumsan. Integer eu ante sit amet risus feugiat fringilla. Quisque mollis nibh nec enim tristique, vel congue mauris feugiat. Vivamus eget odio felis. Donec ut tellus eu odio porttitor fermentum. Vivamus quis metus malesuada, pulvinar arcu at, pharetra augue.'
const contentContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse et neque nec turpis lacinia semper in eu dolor. Sed rutrum ullamcorper magna. Nulla euismod tellus sit amet tincidunt fringilla. Sed eu nunc at nisi venenatis malesuada ut vel odio. Aenean pretium eget dui et blandit. In hac habitasse platea dictumst. Nullam convallis lorem non justo interdum vestibulum. Aliquam semper auctor lectus, ut iaculis nunc dapibus ut. Donec vitae pretium ex. Donec imperdiet leo sit amet nulla eleifend, vel rutrum odio congue. Sed viverra justo a orci efficitur, quis vestibulum mi tincidunt.'

const app = express();


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'));

const posts = [];

app.get('/', (req, res) => {
    res.render('home',
        {
            startingContent: homeStartingContent,
            postsContent: posts,
        });

});

app.get('/about', (req, res) => {
    res.render('about', { aboutContent: aboutContent });
});

app.get('/content', (req, res) => {
    res.render('content', { contentContent: contentContent });
});

app.get('/compose', (req, res) => {
    res.render('compose');
});

app.post('/compose', (req, res) => {

    const post = {
        title: req.body.postTitle,
        content: req.body.postBody
    };
    posts.push(post)
    res.redirect('/')
})

app.get('/posts/:postName', (req, res) => {
    const requestedTitle = _.lowerCase(req.params.postName);
    //    const  requestedTitle = req.params.postName.toLocaleLowerCase();
    posts.forEach((post) => {
        const storedTitle = _.lowerCase(post.title);
        // const storedTitle = post.title.toLocaleLowerCase();
        if (storedTitle === requestedTitle) {
            res.render('post',
                {
                    title: post.title,
                    content: post.content,
                });
        }

    })
})

app.listen(3000, () => {
    console.log('Server Started at 3000');
});
