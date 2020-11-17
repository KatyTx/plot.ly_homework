//read json file 
//need function

function getSample() {
    var inputid = d3.select("#selDataset")

    d3.json("samples.json").then((data) => {
        console.log(data.names);
        data.names.forEach((samplenm) => {
            inputid.append("option").text(samplenm).property("value")
        })
        optionChanged(data.names[0]);
    })

};

getSample()

function optionChanged(sampleiddata) {
    var demoarea = d3.select('#sample-metadata');
    d3.json("samples.json").then((data) => {
        var filtermeta = data.metadata.filter(meta => meta.id == sampleiddata)
        console.log(filtermeta);
        var firstid = filtermeta[0];
        //clear list
        demoarea.html("")
        Object.entries(firstid).forEach(([key, value]) => {
            demoarea.append("p").text(`${key}: ${value}`)
        })
        //create bar chart
        var filtersample = data.samples.filter(sample => sample.id == sampleiddata)
        var firstid = filtersample[0];
        var sampleValues = firstid.sample_values.slice(0, 10).reverse();
        var sampleOtuids = firstid.otu_ids.slice(0, 10).reverse().map(topids => (`OtuID:${topids}`));
        var sampleOtulabel = firstid.otu_labels.slice(0, 10).reverse();

        var trace1 = {
            x: sampleValues,
            y: sampleOtuids,
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

        //bubble chart
        var trace2 = {
            x: firstid.otu_ids,
            y: firstid.sample_values,
            mode: 'markers',
            marker: {
                size: firstid.sample_values,
                color: firstid.otu_ids
            }
        };

        var bubbledata = [trace2];

        var layout2 = {
            title: 'Microbial Species',
            showlegend: false,

        };

        Plotly.newPlot('bubble', bubbledata, layout2);
    });
}


// //bubble chart need function
// function buildbubble() {
//     var trace2 = {
//         x: sampleOtuids,
//         y: sampleValues,
//         mode: 'markers',
//         marker: {
//             size: sampleValues,
//             color: sampleOtuids,
//         }
//     };

//     var bubbledata = [trace2];

//     var layout2 = {
//         title: 'Microbial Species',
//         showlegend: false,
//         height: 600,
//         width: 600
//     };

//     Plotly.newPlot('bubble', bubbledata, layout2);
// };

// // Add event listener for subject ID selection
// d3.select("#selDataset").on("change", getSample);