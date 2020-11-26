function transposeDateDataTableMonthly(dataTable) {

    // Create new datatable
    try {
        var newDataTable = new google.visualization.DataTable();

        // Add first column from original datatable

        newDataTable.addColumn('string', 'Month');

        // Convert column labels to row labels

        for (var x = 1; x < dataTable.getNumberOfColumns(); x++) {
            var label = dataTable.getColumnLabel(x);
            newDataTable.addRow([label]);
        }
        for (var x = 0; x < dataTable.getNumberOfRows(); x++) {
            var label = dataTable.getValue(x, 0);
            newDataTable.addColumn('number', dataTable.getValue(x, 0))
            for (var y = 1; y < dataTable.getNumberOfColumns(); y++) {
                newDataTable.setValue(y - 1, x + 1, dataTable.getValue(x, y));
            }
        }
        return newDataTable;
    } catch (e) {
        alertify.error(e);
    }
}
function transposeDateDataTableRiskMonthlyDetail(dataTable) {
    try {
        var newDataTable = new google.visualization.DataTable();

        newDataTable.addColumn('string', 'Delivery Date 2');

        for (var x = 1; x < dataTable.getNumberOfColumns(); x++) {
            var label = dataTable.getColumnLabel(x);
            newDataTable.addRow([label]);
        }
        for (var x = 0; x < dataTable.getNumberOfRows(); x++) {
            var label = dataTable.getValue(x, 0);
            var d = new Date(label);
            var dtLabel = dateMMMyyyy(d);
            newDataTable.addColumn('number', dtLabel); //dataTable.getValue(x, 0))
            for (var y = 1; y < dataTable.getNumberOfColumns(); y++) {
                newDataTable.setValue(y - 1, x + 1, dataTable.getValue(x, y));
            }
        }
        var SelText = 'Delivery Date';
        newDataTable.setColumnLabel(0, SelText);
        return newDataTable;
    } catch (e) {
        alertify.error(e);
    }
}
function transposePricingMonthlyPrices(dataTable) {
    try {
        var newDataTable = new google.visualization.DataTable();

        newDataTable.addColumn('string', 'Delivery Date 2');

        for (var x = 1; x < dataTable.getNumberOfColumns(); x++) {
            var label = dataTable.getColumnLabel(x);
            if (label.trim() == 'NetUsage') {
                label = 'Net Usage';
            } else if (label == 'EnergyPrice') {
                label = 'Energy Price';
            } else if (label == 'AncServPrice') {
                label = 'Anc Serv Price';
            } else if (label == 'MiscAdminPrice') {
                label = 'Misc/Admin Price';
            } else if (label == 'LossesPrice') {
                label = 'Losses Price';
            } else if (label == 'BasisPrice') {
                label = 'Basis Price';
            } else if (label == 'VolRiskPrice') {
                label = 'Vol Risk Price';
            } else if (label == 'BrokerFee') {
                label = 'Broker Fee';
            } else if (label == 'TotalCost') {
                label = 'Total Cost';
            } else if (label == 'CRR_Price') {
                label = 'Congestion Revenue Rights Price';
            } else if (label == 'GrossUsage') {
                label = 'Gross Usage';
            } else if (label == 'Losses') {
                label = 'Losses';
            } else if (label == 'NoSpin') {
                label = 'No Spin';
            } else if (label == 'ReplacementReserve') {
                label = 'Replacement Reserves';
            } else if (label == 'RegUp') {
                label = 'Reg Up';
            }
            newDataTable.addRow([label]);
        }
        for (var x = 0; x < dataTable.getNumberOfRows(); x++) {
            var label = dataTable.getValue(x, 0);     
            newDataTable.addColumn('number', dataTable.getValue(x, 0))
            for (var y = 1; y < dataTable.getNumberOfColumns(); y++) {
                newDataTable.setValue(y - 1, x + 1, dataTable.getValue(x, y));
            }
        }
        var SelText = 'Delivery Date';
        newDataTable.setColumnLabel(0, SelText);
        return newDataTable;
    } catch (e) {
        alertify.error(e);
    }
}

function transposeLoadResearchVolumetricRisk(dataTable) {
    try {
        var newDataTable = new google.visualization.DataTable();
        // Add Initial Rows
        newDataTable.addColumn('string', 'CostType');
        var label = dataTable.getColumnLabel(2);
        label = 'Shaping Premium';
        newDataTable.addRow([label]);
        label = dataTable.getColumnLabel(3);
        label = 'Volumetric Risk Premium';
        newDataTable.addRow([label]);
        label = 'Total';
        newDataTable.addRow([label]);
        var Total = 0;
        var CurrentValue = 0;
        // Run through to transpose
        for (var x = 0; x < dataTable.getNumberOfRows(); x++) {
            // Get Value For Label
            Total = 0;            
            var label = dataTable.getValue(x, 2);
            newDataTable.addColumn('number', label);
            Total = dataTable.getValue(x, 3) + dataTable.getValue(x, 4);
            newDataTable.setValue(0, x + 1, dataTable.getValue(x, 3));
            newDataTable.setValue(1, x + 1, dataTable.getValue(x, 4));
            newDataTable.setValue(2, x + 1, Total);
        }
        return newDataTable;

    } catch (e) {
        alertify.error(e);
    }
}
