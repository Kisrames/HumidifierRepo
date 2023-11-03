import pandas as pd
import plotly_express as px
import streamlit as st

st.set_page_config(page_title='Sales Dashboard',
                   page_icon=":bar_chart:",
                   layout="wide"
) 


def get_data_from_excel():
    dataframe1 =  pd.read_excel(
        io='supermarkt_sales.xlsx',
        engine='openpyxl',
        sheet_name="Sales",
        skiprows=3,
        usecols= 'B:R',
        nrows=1000,
    )
    dataframe1["hour"] = pd.to_datetime(dataframe1["Time"], format="%H:%M:%S").dt.hour
    return dataframe1
dataframe1 = get_data_from_excel()


st.dataframe(dataframe1)


st.sidebar.header("Please Filter Here")
city = st.sidebar.multiselect(
    "Select the City:",
    options=dataframe1["City"].unique(),
    default=dataframe1["City"].unique()
)

customer_type = st.sidebar.multiselect(
    "Select the Customer Type:",
    options=dataframe1["Customer_type"].unique(),
    default=dataframe1["Customer_type"].unique()
)

gender = st.sidebar.multiselect(
    "Select the Gender:",
    options=dataframe1["Gender"].unique(),
    default=dataframe1["Gender"].unique()

)

dataframe_selection = dataframe1.query(
    "City == @city & Customer_type & Gender == @gender"
)

st.title(":bar_chart: Sales Dashboard")
st.markdown("##")

total_sales = int(dataframe_selection["Total"].sum())
average_rating = round(dataframe_selection["Rating"].mean(),1)
star_rating = ":star:" * int(round(average_rating,0))
average_sale_by_transaction = round(dataframe_selection["Total"].mean(),2)

left_column, middle_column, right_column = st.columns(3)
with left_column:
    st.subheader("Total Sales:")
    st.subheader(f"US $ {total_sales:,}")
with middle_column:
    st.subheader("Average Rating:")
    st.subheader(f"{average_rating} {star_rating}")
with right_column:
    st.subheader("Average Sales Per Transaction:")
    st.subheader(f"US $ {average_sale_by_transaction}")

st.markdown("---")

# SALES BY PRODUCT LINE [BAR CHART]
sales_by_product_line = dataframe_selection.groupby(by=["Product line"])[["Total"]].sum().sort_values(by="Total")
fig_product_sales = px.bar(
    sales_by_product_line,
    x="Total",
    y=sales_by_product_line.index,
    orientation="h",
    title="<b>Sales by Product Line</b>",
    color_discrete_sequence=["#FF4B4B"] * len(sales_by_product_line),
    template="plotly_white",
)
fig_product_sales.update_layout(
    plot_bgcolor="rgba(0,0,0,0)",
    xaxis=(dict(showgrid=False))
)

# SALES BY HOUR [BAR CHART]
sales_by_hour = dataframe_selection.groupby(by=["hour"])[["Total"]].sum()
fig_hourly_sales = px.bar(
    sales_by_hour,
    x=sales_by_hour.index,
    y="Total",
    title="<b>Sales by hour</b>",
    color_discrete_sequence=["#FF4B4B"] * len(sales_by_hour),
    template="plotly_white", 
)
fig_hourly_sales.update_layout(
    xaxis=dict(tickmode="linear"),
    plot_bgcolor="rgba(0,0,0,0)",
    yaxis=(dict(showgrid=False)),
)


left_column, right_column = st.columns(2)
left_column.plotly_chart(fig_hourly_sales, use_container_width=True)
right_column.plotly_chart(fig_product_sales, use_container_width=True)


# ---- HIDE STREAMLIT STYLE ----
hide_st_style = """
            <style>
            #MainMenu {visibility: hidden;}
            footer {visibility: hidden;}
            header {visibility: hidden;}
            </style>
            """
st.markdown(hide_st_style, unsafe_allow_html=True)






