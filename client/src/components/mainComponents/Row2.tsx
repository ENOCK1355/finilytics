import {
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";
import { useGetKpisQuery, useGetProductsQuery } from "../../state/api";
import DashboardBox from "../stylingComponents/DashboardBox";
import BoxHeader from "./BoxHeader";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { Box, Typography, useTheme } from "@mui/material";
import { useMemo } from "react";
import FlexBetween from "./../stylingComponents/FlexBetween";

type Props = {};

const Row2 = () => {
  const { data: kpisData } = useGetKpisQuery();
  const { data: productsData } = useGetProductsQuery();

  const { palette } = useTheme();
  const pieColors = [palette.primary[500], palette.secondary[500], "#8884d8"];

  const operationalNonOperationalExpenses = useMemo(() => {
    return (
      kpisData &&
      kpisData[0].monthlyData.map(
        ({ month, operationalExpenses, nonOperationalExpenses }) => {
          return {
            name: month.substring(0, 3),
            "Operational Expenses": operationalExpenses,
            "Non Operational Expenses": nonOperationalExpenses,
          };
        }
      )
    );
  }, [kpisData]);

  const pieData = [
    { name: "Accra", value: 150 },
    { name: "Kumasi", value: 200 },
    { name: "Cape Coast", value: 110 },
  ];

  const productExpenses = useMemo(() => {
    return (
      productsData &&
      productsData.map(({ _id, price, expense }) => {
        return {
          _id: _id,
          price: price,
          expense: expense,
        };
      })
    );
  }, [productsData]);

  return (
    <>
      <DashboardBox bgcolor="#fff" gridArea="d">
        <BoxHeader
          title="Operational vs Non-Operational Expenses"
          subtitle="Monthly Overview of Operational Expenses vs Non-Operational Expenses"
          icon={<TrendingUpIcon />}
        />
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={operationalNonOperationalExpenses}
            margin={{
              top: 20,
              right: 0,
              left: -10,
              bottom: 55,
            }}
          >
            <CartesianGrid stroke={palette.grey[800]} />
            <XAxis
              dataKey="name"
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              yAxisId="left"
              orientation="left"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "10px" }}
            />
            <Tooltip />
            <Legend height={28} wrapperStyle={{ margin: "0 0 10px 0" }} />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="Non Operational Expenses"
              stroke={palette.secondary[500]}
              dot={{ fill: palette.secondary[500], strokeWidth: 1 }}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="Operational Expenses"
              stroke={palette.primary[500]}
              dot={{ fill: palette.primary[500], strokeWidth: 1 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>

      <DashboardBox bgcolor="#fff" gridArea="e">
        <BoxHeader title="Campaigns and Targets" sideText="+30%" />
        <FlexBetween mt="0.25rem" gap="1.5rem" pr="1rem">
          <PieChart
            width={110}
            height={100}
            margin={{
              top: 0,
              right: -10,
              left: 10,
              bottom: 0,
            }}
          >
            <Tooltip />
            <Pie
              data={pieData}
              innerRadius={18}
              outerRadius={38}
              paddingAngle={2}
              dataKey="value"
              stroke="none"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${entry.name}`} fill={pieColors[index]} />
              ))}
            </Pie>
          </PieChart>
          <Box ml="-0.7rem" flexBasis="40%" textAlign="center">
            <Typography variant="h5">Target Sales</Typography>
            <Typography m="0.3rem 0" variant="h3" color={palette.primary[300]}>
              500
            </Typography>
            <Typography variant="h6">
              The sales goal set for the year's campaign
            </Typography>
          </Box>
          <Box flexBasis="40%">
            <Typography variant="h5">Losses In Revenue</Typography>
            <Typography variant="h6">Losses are down 15%</Typography>
            <Typography variant="h5" mt="0.5rem">
              Profit Margins
            </Typography>
            <Typography variant="h6">
              Margins are up by 30% from last year's campaign
            </Typography>
          </Box>
        </FlexBetween>
      </DashboardBox>

      <DashboardBox bgcolor="#fff" gridArea="f">
        <BoxHeader title="Product Prices vs Expenses" />
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart
            margin={{
              top: 20,
              right: 25,
              bottom: 40,
              left: -10,
            }}
          >
            <CartesianGrid stroke={palette.grey[800]} />
            <XAxis
              type="number"
              dataKey="price"
              name="price"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
              tickFormatter={(v) => `$${v}`}
            />
            <YAxis
              type="number"
              dataKey="expense"
              name="expense"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
              tickFormatter={(v) => `$${v}`}
            />
            <Tooltip formatter={(v) => `$${v}`} />
            <Scatter
              name="Product Price vs Expenses"
              data={productExpenses}
              fill="#8884d8"
              shape={(props) => (
                <circle cx={props.cx} cy={props.cy} r={2.5} fill="#8884d8" />
              )}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  );
};

export default Row2;
