Memes R' Us: Taskfall
==========================================================================
Project Start Date: 9 - 25 - 2020

Chapters
--------------------------------------------------------------------------

### Chapter 0

Start Date: 9 - 25 - 2020

End Date: 10 - 2 - 2020

Set up the basic ecommerce flow. You can't actually download the memes you
"purchased" just yet. This project was intented to get familiar with stripe
and how to integrate it with an ecommerce-ish site. I realized that I was
also inadvertantly adding in the challenge of sending zip files over a
server and managing an Amazon S3 instance (on top of a mongo database). So,
once I make the necessary security precautions, I will close this chapter. I
might come back to it once I get more familiar with S3, or I want to take
the time to actually integrate S3 fully.

Backlog
--------------------------------------------------------------------------

- [x] Move keys to environment! (10 - 2 - 2020)

- [x] Checkout System (10 - 2 - 2020)
    - [x] Implement checkout post (10 - 2 - 2020)
    - [x] Implement stripe checkout (10 - 2 - 2020)
    - [x] Adjust domain based on environment (10 - 2 - 2020)
    - [x] Create order confirmation url (10 - 2 - 2020)
    - [x] Create cancel url (10 - 2 - 2020)

- [ ] Actually download the memes
    - [x] Get urls from checkout session (10 - 2 - 2020)
    - [x] Send zip file (10 - 2 - 2020)
        - [x] Created a mock download (10 - 2 - 2020)
        - [x] Used filestream to send zip file (10 - 2 - 2020)
    - [ ] Dynamically zip files
    - [ ] Get files from S3

- [ ] Fix your stupid code
    - [ ] CSS
    - [ ] Browser-side JavaScript
    - [ ] Get icons

- [ ] Admin system
    - [ ] Create Admin Page
    - [ ] Add new memes
        - [ ] Make database entry
        - [ ] Upload to S3
        - [ ] Create stripe product
    - [ ] Remove memes
        - [ ] Remove database entry
        - [ ] Remove S3 file
        - [ ] Remove stripe product

- [ ] Security
    - [ ] Move keys to environment
    - [ ] Add security measures to S3
    - [ ] Add logging

- [ ] Use mongo or redis for sessions

Updates
--------------------------------------------------------------------------

Changelog
--------------------------------------------------------------------------

### v0.2.0

- [x] Add grid system to layout (9 - 28 - 2020)
- [x] Remove filtering system (this is a demo, no need to be extra) (9 - 29 - 2020)

- [x] Advanced Data (9 - 30 - 2020)
    - [x] Add S3 storage (9 - 28 - 2020)
    - [x] Add stripe price id to dummy data (9 - 28 - 2020)
    - [x] Add MongoDB (9 - 30 - 2020)
    - [x] Add session stuff (9 - 30 - 2020)

- [x] Cart System (10 - 2 - 2020)
    - [x] Create a products list (9 - 28 - 2020)
    - [x] Create shopping carts maintained by session (9 - 30 - 2020)
        - [x] Make sure to disable checkout button if there are no items (9 - 30 - 2020)
    - [x] Add indicator for number of items in cart (9 - 30 - 2020)
    - [x] A meme can't be added twice LMAO! (9 - 30 - 2020)
    - [x] Add flash messages to website (10 - 2 - 2020)
        - [x] Dismissable messages (10 - 1 - 2020)
        - [x] Express flash system (10 - 2 - 2020)

### v0.1.0

- [x] Add grunt watch/reload system for express (9 - 27 - 2020)
    - [x] Move code from `index.js` to `app.js` (9 - 27 - 2020)
        - NOTE: Reverted. Turns out I didn't need to do it (9 - 27 - 2020)
    - [x] Express and watch tasks (9 - 27 - 2020)

- [x] Get the Site looking like it does something (9 - 28 - 2020)
    - [x] Show some memes (9 - 26 - 2020)
    - [x] Page layouts (9 - 28 - 2020)
    - [x] Styling (9 - 28 - 2020)

Didn't Work
--------------------------------------------------------------------------