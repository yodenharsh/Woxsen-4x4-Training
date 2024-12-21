-- ALL QUERIES INTENDED FOR PostGreSQL 16 

-- Q1
select channel, SUM(total_amount) as revenue, COUNT(channel) from sales_transactions st group by channel;

-- Q2
select state, COUNT(state) as customers_per_state from customer_profiles cp group by state order by customers_per_state desc limit 5; 

-- Q3
select membership_status, avg(age) as avg_age from customer_profiles cp group by membership_status; 

-- Q4
SELECT
    EXTRACT(week FROM timestamp) AS week,
    Count(*) as num_transactions,
    ROUND(AVG(total_amount)) AS avg_total_amount,
    COUNT(CASE WHEN channel = 'Offline' THEN 1 END) AS offline_count,
    COUNT(CASE WHEN channel = 'Online' THEN 1 END) AS online_count
FROM
    sales_transactions
GROUP BY
    week
ORDER BY
    week;

-- Q5
-- total_strength, visit_frequency, member_status
select membership_status, avg(age) as avg_age, mode() within group(order by frequency_of_visits) as average_frequency_of_visits
from 
	customer_profiles cp 
group by
	membership_status; 

-- Q6
-- Relationship between payment preferences and average transaction value, discount percentage and channel preference
select
	cp.payment_preference,
	avg(st.total_amount) as avg_tr_val,
	avg(st.discount_percentage) as avg_disc_perc,
	mode() within group(order by st.channel desc) as most_used_channel 
from 
	customer_profiles cp
right join
	sales_transactions st
on 
	cp.customer_id = st.customer_id
group by
	cp.payment_preference; 

-- Q7
-- cohort analysis based on registeration date
select extract(month from cp.registration_date) as registered_month, count(*) as num_custs from customer_profiles cp group by registered_month
order by registered_month asc

-- Q8
-- product perf. analysis
select product_id, sum(quantity) as quantity_sold, round(avg(final_price)) as avg_final_price, sum(total_amount) as revenue_generated
from sales_transactions st 
group by product_id order by product_id asc


