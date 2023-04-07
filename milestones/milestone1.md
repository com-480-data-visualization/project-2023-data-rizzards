## Milestone 1

### Dataset

The [dataset](https://www.kaggle.com/datasets/rohanrao/formula-1-world-championship-1950-2020) we chose is about the world of Formula-1. It contains a lot of information on the circuits, constructors, drivers, races, etc. between the years 1950-2023.
It is separated into many `csv` files, and the information can be selected by ID (race_id, driver_id, etc.).
Overall, the data is very complete and has the potential for many visualizations.

In addition, we will use a [repository](https://github.com/f1laps/f1-track-vectors) containing SVG files for the Formula 1 tracks.

Before tackling visualization, we will have to regroup the information of interest into different tables.

### Problematic

Using this dataset, we want to visualize detailed information about F1 drivers and races.

1. For a given race, how the race unfolded (positions of the drivers, pit stops, etc.)

2. For a given driver, how the driver's performance evolved over time, which teams they raced for, how many races did they win, compare them to other drivers, etc.

3. For each year, the schedule of the races, their locations on the world map, which teams participated, etc.

With these visualizations we want to target two demographies:

- F1 fans who want to look up information about their favorite drivers,
- or new fans who want to learn more about the sport to be able to chime in on conversations about it.

### Exploratory Data Analysis

> Pre-processing of the data set you chose
>
> - Show some basic statistics and get insights about the data

See [data_analysis.ipynb](/data_analysis.ipynb)

### Related work

> What others have already done with the data?

People have already analyzed the data to find interesting insights about the sport.  
For example:

- [formula-1-70th-anniversary](https://www.kaggle.com/code/ekrembayar/formula-1-70th-anniversary/report); visualized stats about one specific season of F1.
- [unlucky-drivers](https://www.kaggle.com/code/samarth8/f1-mechanical-failures-and-unlucky-drivers); analyzed the data to find the mechanical failures of the cars in each race, and which drivers were unlucky to have their cars break down the most times.
- [dominance-in-f1](https://www.kaggle.com/code/lucabasa/the-search-for-dominance-in-f1); used the data to find the most dominant drivers and teams in F1 history.
- [lewis-hamilton](https://www.kaggle.com/code/tiagowutzke/lewis-hamilton-stats-of-a-champion); visualized the stats of a specific driver, Lewis Hamilton.

> Why is your approach original?

- We want to make an animated race visualization, by using the circuit as a background and showing the positions of the drivers on the track, versus the one dimensional approach of the visualization we found.
- We also want to visualize the schedule of the F1 races on the world map, to show how the teams travel around the world. Additionally, we want to visualize which teams participated in each season of the F1 Championship.
- We would also like to make an interactive visualization that allows you to compare the stats of any two drivers.

> What source of inspiration do you take? Visualizations that you found on other websites or magazines (might be unrelated to your data).

Here are a few of the visualizations we found that inspired us:

- [f1-visualization](https://f1-visualization.vercel.app/), here someone visualizes the progress of a specific race by showing the relative positions of the drivers after each lap, but only on a 1D axis.
- [visualizing-career-flows](https://uxdesign.cc/visualizing-career-flows-in-sports-formula-1-3d88feca257c), here we saw an example of a timeline visualization of drivers and their teams.
- [fascinating-graphs-on-formula-1](https://medium.com/visual-analytics-field-notes/11-fascinating-graphs-on-formula-1-acd05bcd3e73), there are some more examples of assorted visualizations of F1 data.

> In case you are using a dataset that you have already explored in another context (ML or ADA course, semester project...), you are required to share the report of that work to outline the differences with the submission for this class.

Not applicable.
