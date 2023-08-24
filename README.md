# ASSIGNMENT 2 - Feature Flicks - The Cinema

- Using React with HTML/jsx, CSS, Bootstrap, JavaScript and consumtion of data from a ready-made REST-api to build a small web site.



The project has been divided into the following sections/components:

#### Main/start component:
- App component - Where it all starts. App holds the stucture of the site, with header and the `<HeaderMenu/>` component in it, main area that holds all the Routes, and finally footer with `<Footer/>` component.

#### Pages component:
- Welcome - This is the start page of the website. 
- Movies - movies/screenings and categories fetched in the App are being used here. The user can filter out the movies according to genres/categories. It is also possible to search for a particular movie. If clicked on a particular movie the user is taken to a detailed movie page.
- MovieDetails - Movie details shows all the details of the movie selected by the user.
- ScreeningList - In this page, the user can view the seats and book the available seats. The booking fee is varies from adult to youth.
- Receipt - This page is the final place the user arrives after successfully booking the movie screening at Feature flicks Cinema, here the user receives a booking number with all the necessary details about the movie they have chosen to book.
- Page404 - This page is shown when any page was not found or if a wrong url is entered.


#### Particular components:
- Header - react-bootstrap header
- Footer - simple sticky footer
- DisplaySeats - user can choose as many seats as there are available.


### Assignment:
==========

<strong>Feature Flicks</strong> is a small cinema that wants to start competing locally with SF. They have two auditoriums “Lilla Salen” and “Stora Salen” and are located in Småstad in Sweden.

Now they need help building a prototype for a website, where visitors should be able to:
- Get information about movies being shown, incl. dates and times.
- You should be able to see a list of screenings, sorted by the date they the movies are shown, with each date as a seperate headline (including date and weekday).
- For each screening, the date and time of the screening and the title, movie poster and length (in hours and minutes) of the movie should be shown
- You should be able to filter this list by category.
- When you click on a movie in the list - you should be transfered to the booking page where you can choose your seats.
- When you boko your ticket(s) you shall get a ‘receipt’ with the total price, the date and time, all the seat numbers and booking number.

<strong>Feature Flicks</strong> would like to have a booking system where you can see a graphic view of the auditorium and its seats. You should be able to book a number of adjacent seats during a specific screening of a film.

While booking, you should be able to choose the number of visitors and see the total price. When you complete a booking, you should receive a unique booking number, as well as be able to see which row(s) and seats you have booked.

Note! Seniors (above the age of 65) and children (under the of 12) should have a lower ticket price. The normal ticket price is SEK 110, seniors SEK 85, children SEK 75.

So far, you don’t need to be able to pay online - you pay when you arrive at the cinema and tell the staff your booking number.

The seats are numbered from right to left, front to back. (The chair at the front right has the number 1. If the salon has 100 chairs, the one at the furthest back and to the left has the number 100.)

A finished backend with a REST-api and a MySQL has already been provided by another company, so your role is to create a frontend!

You should integrate the backend in your code! (It’s here - link to come.)

- More about the assignment:
https://da218.lms.nodehill.se/article/assignment-2-of-2-feature-flicks-the-cinema
