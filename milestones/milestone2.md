## Milestone 2

### Link to the [functional website](https://com-480-data-visualization.github.io/project-2023-data-rizzards)

Our website is composed of 4 sections; one being the home page and the three others will contain specific visualizations of the Formula-1 data.

### 1. Race

This page will focus on an animated visualization of the race. The user will be able to select a track and a driver and see their performance over different seasons/years.

##### Motivation:

- The user can compare the performance of their favorite driver on the same track over different seasons.
- F1 does a complete re-design of the cars every 6-7 years. We can visualize how the performance of a driver changed after the redesign.
- If a driver changed teams, we can compare their performance while driving cars from different teams.

##### For context see this sketch:

![race visualisation](./images/dv_race.jpg)

After selecting the track and driver, we will retrieve all seasons where the driver raced on the selected track. (The user will be able to select the seasons of interest.)

The main focus is the track. The track will be animated and the user will be able to see the position of the drivers at each time step.

- The dots on the track will represent the relative position of the driver at each time step.
- The color of the dot will represent the season.
- The position of each dot will change at a speed proportional to the lap time.

##### Additional features:

- We can allow the user to instead select a track and season (eg: Monaco 2021), and see a visualization of how the race unfolded. The user can see the relative position of the drivers at each lap.

- We can allow the user to select a track and a team, and see the relative performance of the two drivers in the same team.

##### Tools used:

- To draw the track, we will use SVGs from this [repository](https://github.com/f1laps/f1-track-vectors).
- To animate the dots over the track, we will directly manipulate the svg using [svg-path-properties](https://github.com/rveciana/svg-path-properties).

### 2. Driver

This section will show, for a given driver or a few selected ones, how the drivers' performance evolved over time.

TODO: Include sketch and details.

Additional features:

- using colors, show which teams they raced for

To help with visualization, the library [nivo](https://nivo.rocks/about/), and more specifically the tool [AreaBump](https://nivo.rocks/area-bump/).
Furthermore, the lecture 5 on interactions will be helpful to get more insight on using the mouse to select from multiple choices and layering. The lecture 6 on perception colors and marks will be helpful to show informations using width, colors, and much more.

### 3. Season

This section will show, for each year, a list of teams that participated, the schedule of the races and a flow map showing the movement of the teams during the year.
Furthermore, we add a count of total kilometers traveled as well as an approximation of CO2 emission.
-> lecture 8 is about maps

• Include sketches of the vizualiation you want to make in your final product.
• List the tools that you will use for each visualization and which (past or future) lectures you will need.
• Break down your goal into independent pieces to implement. Try to design a core visualization (minimal viable product) that will be required at the end.
Then list extra ideas (more creative or challenging) that will enhance the visualization but could be dropped without endangering the meaning of the
project.
