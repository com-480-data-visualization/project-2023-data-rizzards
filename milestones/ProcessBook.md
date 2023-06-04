 (max 8 pages) 

 o Describe the path you took to obtain the final result 

 o Explain challenges that you faced and design decisions that you took 

 o Reuse the sketches/plans that you made for the first milestone, expanding them and explaining the changes 

 o Care about the visual/design of this report 
 
 o Peer assessment: include a breakdown of the parts of the project completed by each team member.

# Process Book
By group Data Rizzards: Borbely Ambroise, Michalski Elisa & Dixit Sabharwal

### Path taken to obtain the final result 

#### Choosing a dataset
At the beginning of the project, the most important aspect is choosing what we want to show and which dataset to use.
During a first brainstorming session, we explored various datasets and discussed the most exciting and effective options.
We finally agreed on a dataset on Formula-1 due to its completeness the multitude of possibilities it offers for analysis and visualization.

We decided on creating an interactive visualization tool facilitating the navigation of users, both newcomers and experts, through the world of Formula-1.
We wanted to focus on three aspects:
- Driver Performance: Showcase the evolution of a driver's performance over time;
- Race Analysis: For a specific race, illustrate how the race unfolded;
- Transport overview: Yearly Overview: Display race locations on a world map and travels from one to another.

To show races, we also found a repository containing SVG files for some of the Formula 1 tracks. 

#### Choosing the visualizations
To decide how exactly we wanted to show our main aspects, we brainstormed again and agreed that a website with a page for each separate visualization would be best. 
This also allowed us to separate work more easily.

Our website is hence composed of 4 sections; one being the home page and the three others will contain specific visualizations of the Formula-1 data:

- Driver:

The page on driver's performance will showcase the evolution of a given driver's performance over time.
The objective is to allow users to observe how drivers' rankings have changed over the years and compare their performance against other drivers.
Users will be able to view the driver's ranking across different years and their cumulative points.

After selecting a set of drivers of interest, the users will be able to see two visualizations.
The first shows the rank of the selected drivers during the years. The user will see how the performances of their selected drivers change over the years.

![driver visualisation](./images/drivers_rank.png)

The second shows, for a selected year, the cumulated points over the season. The user will see how their selected drivers' position in the competition over the season.

![cumulative points visualisation](./images/drivers_points.png)


Race
This page will focus on an animated visualization of the race. The user will be able to select a track and a driver and see their performance over different seasons/years.
Motivation:
The user can compare the performance of their favorite driver on the same track over different seasons.
F1 does a complete re-design of the cars every 6-7 years. We can visualize how the performance of a driver changed after the redesign.
If a driver changed teams, we can compare their performance while driving cars from different teams

Transport
For this visualisation, the main idea is to show the different locations of the circuits during the year. This will be shown via an animation on a map showing the position/country of each circuit with a travel animation between the countries in the order that the season is going.

It will then be possible to see also the number of kilometres travelled during the season. This number is dynamically increased as the travel animations are going. It will also be possible to pause/resume the animation.

To make it work for every season the user will choose the season wanted.

#### Creating the website

TODO: description of the actual visualizations


### Challenges
TODO

### Peer assessment

Each member worked on a page (from data processing to final product).

Elisa Michalski worked on the Driver's page.
Dixit Sabharwal worked on the Race's page.
Ambroise Borbely worked on the Transport's page.

Each member brainstormed together and reviewed each other pages.

