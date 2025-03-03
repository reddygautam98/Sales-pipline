-- Create the sales_pipeline_data table
CREATE TABLE sales_pipeline_data (
    Opportunity_ID INT,
    Created_Date DATE,
    Closed_Date DATE,
    Sales_Stage VARCHAR(50),
    Product_Type VARCHAR(50),
    Sales_Rep VARCHAR(50),
    Opportunity_Size VARCHAR(50),
    Deal_Amount DECIMAL(10, 2),
    Status VARCHAR(50)
);

-- Load data from CSV file
-- Note: The following command is for MySQL. Adjust the syntax if using a different database.
LOAD DATA INFILE 'C:\Users\reddy\Downloads\Sales pipline\sales_pipeline_data.csv'
INTO TABLE sales_pipeline_data
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

-- Calculate basic metrics
SELECT
    COUNT(*) AS Total_Opportunities,
    COUNT(CASE WHEN Status = 'Won' THEN 1 END) AS Total_Won,
    AVG(Deal_Amount) AS Average_Deal_Size,
    AVG(DATEDIFF(Closed_Date, Created_Date)) AS Average_Time_to_Convert,
    (COUNT(CASE WHEN Status = 'Won' THEN 1 END) * 100.0 / COUNT(*)) AS Conversion_Rate
FROM sales_pipeline_data;

-- Opportunities by sales stage
SELECT
    Sales_Stage,
    COUNT(*) AS Opportunities
FROM sales_pipeline_data
GROUP BY Sales_Stage;

-- Opportunities by status and sales stage
SELECT
    Sales_Stage,
    Status,
    COUNT(*) AS Opportunities
FROM sales_pipeline_data
GROUP BY Sales_Stage, Status;

-- Deal amount by product type
SELECT
    Product_Type,
    SUM(Deal_Amount) AS Total_Deal_Amount,
    AVG(Deal_Amount) AS Average_Deal_Amount,
    COUNT(*) AS Opportunities
FROM sales_pipeline_data
GROUP BY Product_Type;

-- Sales performance by deal size
SELECT
    Opportunity_Size,
    SUM(Deal_Amount) AS Total_Deal_Amount,
    AVG(Deal_Amount) AS Average_Deal_Amount,
    COUNT(*) AS Total_Opportunities,
    COUNT(CASE WHEN Status = 'Won' THEN 1 END) AS Won_Opportunities
FROM sales_pipeline_data
GROUP BY Opportunity_Size;

-- Opportunities by year
SELECT
    YEAR(Created_Date) AS Year,
    COUNT(*) AS Opportunities
FROM sales_pipeline_data
GROUP BY YEAR(Created_Date);

-- Won details and deal amount by sales rep
SELECT
    Sales_Rep,
    SUM(Deal_Amount) AS Total_Deal_Amount,
    AVG(Deal_Amount) AS Average_Deal_Amount,
    COUNT(*) AS Total_Opportunities,
    COUNT(CASE WHEN Status = 'Won' THEN 1 END) AS Won_Opportunities
FROM sales_pipeline_data
GROUP BY Sales_Rep;