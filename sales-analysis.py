import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

def load_and_prepare_data(file_path):
    """
    Load and prepare the sales pipeline data for analysis
    """
    # Read the CSV file
    df = pd.read_csv(file_path)
    
    # Convert date columns to datetime
    df['Created_Date'] = pd.to_datetime(df['Created_Date'])
    df['Closed_Date'] = pd.to_datetime(df['Closed_Date'])
    
    # Calculate time to convert (in days)
    df['Time_to_Convert'] = (df['Closed_Date'] - df['Created_Date']).dt.days
    
    return df

def calculate_basic_metrics(df):
    """
    Calculate basic metrics from the sales pipeline data
    """
    metrics = {
        'Total_Opportunities': len(df),
        'Total_Won': len(df[df['Status'] == 'Won']),
        'Average_Deal_Size': df['Deal_Amount'].mean(),
        'Average_Time_to_Convert': df['Time_to_Convert'].mean(),
        'Conversion_Rate': (len(df[df['Status'] == 'Won']) / len(df)) * 100
    }
    
    return metrics

def analyze_opportunities_by_stage(df):
    """
    Analyze opportunities by sales stage
    """
    stage_analysis = df.groupby('Sales_Stage').agg({
        'Opportunity_ID': 'count',
        'Deal_Amount': 'sum'
    }).reset_index()
    
    # Create visualization
    plt.figure(figsize=(12, 6))
    sns.barplot(data=stage_analysis, x='Sales_Stage', y='Opportunity_ID')
    plt.title('Opportunities by Sales Stage')
    plt.xticks(rotation=45)
    plt.tight_layout()
    plt.savefig('opportunities_by_stage.png')
    plt.close()
    
    return stage_analysis

def analyze_opportunities_by_status_and_stage(df):
    """
    Analyze opportunities by status and sales stage
    """
    status_stage_analysis = pd.crosstab(df['Sales_Stage'], df['Status'])
    
    # Create visualization
    plt.figure(figsize=(12, 6))
    status_stage_analysis.plot(kind='bar', stacked=True)
    plt.title('Opportunities by Status and Sales Stage')
    plt.xticks(rotation=45)
    plt.legend(title='Status')
    plt.tight_layout()
    plt.savefig('opportunities_by_status_stage.png')
    plt.close()
    
    return status_stage_analysis

def analyze_deal_amount_by_product(df):
    """
    Analyze deal amounts by product type
    """
    product_analysis = df.groupby('Product_Type').agg({
        'Deal_Amount': ['sum', 'mean', 'count']
    }).reset_index()
    
    # Create visualization
    plt.figure(figsize=(10, 6))
    sns.barplot(data=df, x='Product_Type', y='Deal_Amount')
    plt.title('Average Deal Amount by Product Type')
    plt.xticks(rotation=45)
    plt.tight_layout()
    plt.savefig('deal_amount_by_product.png')
    plt.close()
    
    return product_analysis

def analyze_sales_performance_by_deal_size(df):
    """
    Analyze sales performance by deal size
    """
    size_performance = df.groupby('Opportunity_Size').agg({
        'Deal_Amount': ['sum', 'mean', 'count'],
        'Opportunity_ID': lambda x: len(x[df['Status'] == 'Won'])
    }).reset_index()
    
    size_performance.columns = ['Opportunity_Size', 'Total_Amount', 'Average_Amount', 
                              'Total_Opportunities', 'Won_Opportunities']
    
    # Create visualization
    plt.figure(figsize=(12, 6))
    sns.barplot(data=df, x='Opportunity_Size', y='Deal_Amount', hue='Status')
    plt.title('Deal Amount Distribution by Opportunity Size')
    plt.xticks(rotation=45)
    plt.tight_layout()
    plt.savefig('performance_by_deal_size.png')
    plt.close()
    
    return size_performance

def analyze_opportunities_by_year(df):
    """
    Analyze opportunities by year
    """
    df['Year'] = df['Created_Date'].dt.year
    year_analysis = df.groupby('Year').agg({
        'Opportunity_ID': 'count',
        'Deal_Amount': 'sum'
    }).reset_index()
    
    # Create visualization
    plt.figure(figsize=(10, 6))
    sns.lineplot(data=year_analysis, x='Year', y='Opportunity_ID', marker='o')
    plt.title('Opportunities by Year')
    plt.tight_layout()
    plt.savefig('opportunities_by_year.png')
    plt.close()
    
    return year_analysis

def analyze_sales_rep_performance(df):
    """
    Analyze sales performance by sales representative
    """
    rep_performance = df.groupby('Sales_Rep').agg({
        'Deal_Amount': ['sum', 'mean'],
        'Opportunity_ID': 'count',
        'Status': lambda x: (x == 'Won').sum()
    }).reset_index()
    
    rep_performance.columns = ['Sales_Rep', 'Total_Amount', 'Average_Amount', 
                             'Total_Opportunities', 'Won_Opportunities']
    
    # Calculate win rate
    rep_performance['Win_Rate'] = (rep_performance['Won_Opportunities'] / 
                                 rep_performance['Total_Opportunities'] * 100)
    
    # Create visualization
    plt.figure(figsize=(12, 6))
    sns.barplot(data=df[df['Status'] == 'Won'], 
                x='Sales_Rep', y='Deal_Amount')
    plt.title('Total Won Deal Amount by Sales Rep')
    plt.xticks(rotation=45)
    plt.tight_layout()
    plt.savefig('sales_rep_performance.png')
    plt.close()
    
    return rep_performance

def generate_report(file_path):
    """
    Generate a comprehensive sales pipeline analysis report
    """
    # Load and prepare data
    df = load_and_prepare_data(file_path)
    
    # Calculate all metrics and analyses
    basic_metrics = calculate_basic_metrics(df)
    stage_analysis = analyze_opportunities_by_stage(df)
    status_stage_analysis = analyze_opportunities_by_status_and_stage(df)
    product_analysis = analyze_deal_amount_by_product(df)
    size_performance = analyze_sales_performance_by_deal_size(df)
    year_analysis = analyze_opportunities_by_year(df)
    rep_performance = analyze_sales_rep_performance(df)
    
    # Print report
    print("\n=== Sales Pipeline Analysis Report ===\n")
    
    print("Basic Metrics:")
    print(f"Total Opportunities: {basic_metrics['Total_Opportunities']}")
    print(f"Total Won Opportunities: {basic_metrics['Total_Won']}")
    print(f"Average Deal Size: ${basic_metrics['Average_Deal_Size']:,.2f}")
    print(f"Average Time to Convert: {basic_metrics['Average_Time_to_Convert']:.1f} days")
    print(f"Conversion Rate: {basic_metrics['Conversion_Rate']:.1f}%")
    
    print("\nOpportunities by Sales Stage:")
    print(stage_analysis)
    
    print("\nOpportunities by Status and Sales Stage:")
    print(status_stage_analysis)
    
    print("\nDeal Amount by Product Type:")
    print(product_analysis)
    
    print("\nSales Performance by Deal Size:")
    print(size_performance)
    
    print("\nOpportunities by Year:")
    print(year_analysis)
    
    print("\nSales Representative Performance:")
    print(rep_performance)
    
    print("\nVisualization files have been saved in the current directory.")

if __name__ == "__main__":
    generate_report(r"C:\Users\reddy\Downloads\Sales pipline\sales_pipeline_data.csv")
