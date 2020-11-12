//read json file 
//need function

function getSample() {

    d3.json("data/samples.json").then((data) => {
        var sampledata = data;

        //print the names of the columns in metadata
        console.log(sample.metadata.column_names);

        //print the names of the columns in sample data
        console.log(sample.samples.column_names);

        //create array of data
        var samplenm = Object.values(sample.names);
        var sampleiddata = Object.values(sample.metadata);
        var sampleValues = Object.values(sample.samples.sample_values);
        var sampleOtuids = Object.values(sample.samples.otu_ids);
        var sampleOtulabel = Object.values(sample.samples.otu_labels);

        updateDemotable(sampleiddata);
    });
}

function updateDemotable(sampleiddata) {
    var demoarea = d3.select('#sample-metadata');

}

function buildbar() {
    var trace1 = {
        x: sampleValues,
        labels: sampleOtulabel,
        type: 'bar',
        text: sampleOtulabel,
        orientation: 'h'
    };

    var chartdata = [trace1];

    var layout = {
        title: `Top 10 OTUs`,
    };

    Plotly.newPlot("bar", chartdata, layout);
};


//bubble chart need function
function buildbubble() {
    var trace2 = {
        x: sampleOtuids,
        y: sampleValues,
        mode: 'markers',
        marker: {
            size: sampleValues,
            color: sampleOtuids,
        }
    };

    var bubbledata = [trace2];

    var layout2 = {
        title: 'Microbial Species',
        showlegend: false,
        height: 600,
        width: 600
    };

    Plotly.newPlot('bubble', bubbledata, layout2);
};

// Add event listener for subject ID selection
d3.select("#selDataset").on("change", getSample);