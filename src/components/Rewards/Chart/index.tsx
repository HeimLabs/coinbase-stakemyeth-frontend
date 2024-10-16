import { useEffect, useState } from 'react';
import { XAxis, Tooltip, ResponsiveContainer, Area, ComposedChart, TooltipProps } from 'recharts';
import { StakingReward } from '../../../types/api.types';

type ChartData = {
    date: string;
    amount: number;
};

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
        return (
            <div style={{
                backgroundColor: "#9747FF",
                padding: "10px",
                border: "none",
                borderRadius: "10px",
                color: "white"
            }}>
                <p style={{ fontSize: "small", fontWeight: "200" }}>{`${label}`}</p>
                <p>{`${payload[0].value} ETH`}</p>
            </div>
        );
    }

    return null;
};

export default function Chart({ rewards }: { rewards: StakingReward[] }) {
    const [data, setData] = useState<ChartData[]>([]);

    useEffect(() => {
        const generateChartData = () => {
            let chartData: ChartData[] = rewards.map(reward => ({
                date: (new Date(reward.date)).toLocaleDateString(),
                amount: (reward.amount),
            }));

            // Sort the data by date
            chartData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

            chartData = chartData.map((reward) => ({
                ...reward,
                date: reward.date.slice(0, -5)
            }));

            setData(chartData);
        };

        generateChartData();
    }, [rewards]);

    return (
        <ResponsiveContainer width="100%" height={400}>
            <ComposedChart margin={{ top: 0, left: 0, right: 0, bottom: 0 }} data={data}>
                <defs>
                    <linearGradient id="colorUSDValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#9747FF" stopOpacity={0.2} />
                        <stop offset="80%" stopColor="#9747FF" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <XAxis
                    dataKey="date"
                    interval={'preserveStartEnd'}
                    axisLine={false}
                    tickLine={false}
                    style={{ fontWeight: "200" }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                    type="monotone"
                    dataKey="amount"
                    stroke="#9747FF"
                    fillOpacity={1}
                    strokeWidth={1}
                    fill="url(#colorUSDValue)"
                    tooltipType='none'
                />
            </ComposedChart>
        </ResponsiveContainer>
    );
};

export function LoadingChart({ isLoading }: { isLoading: boolean }) {
    const [data, setData] = useState<ChartData[]>([]);

    useEffect(() => {
        const generateRandomData = () => {
            const now = new Date();
            let lastValue = 50;
            const maxChange = isLoading ? 10 : 0.5;

            return Array.from({ length: 30 }, (_, i) => {
                // Generate a random change, biased towards smaller changes
                const change = (Math.random() - 0.5) * maxChange;

                // Update the value, keeping it between 0 and 100
                lastValue = Math.max(0, Math.min(100, lastValue + change));

                return {
                    date: new Date(now.getTime() - (9 - i) * 24 * 60 * 60 * 1000).toLocaleDateString().slice(0, -5),
                    amount: lastValue
                };
            });
        };

        const updateData = () => {
            const newData = generateRandomData();
            setData(newData);
        };

        // Initial data generation
        updateData();

        // Set up interval to update data every 2 seconds
        const intervalId = setInterval(updateData, 1500);

        // Clean up interval on component unmount
        return () => clearInterval(intervalId);
    }, [isLoading]);

    return (
        <>
            <ResponsiveContainer width="100%" height={400} style={{ "pointerEvents": "none" }}>
                <ComposedChart margin={{ top: 0, left: 0, right: 0, bottom: 0 }} data={data}>
                    <defs>
                        <linearGradient id="colorUSDValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#9747FF" stopOpacity={0.2} />
                            <stop offset="80%" stopColor="#9747FF" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                        type="monotone"
                        dataKey="amount"
                        stroke="#9747FF"
                        fillOpacity={1}
                        strokeWidth={1}
                        fill="url(#colorUSDValue)"
                        tooltipType='none'
                    />
                </ComposedChart>
            </ResponsiveContainer>
            <div style={{
                "position": "absolute",
                "color": "#9747FF",
                "fontWeight": "200"
            }}>
                {isLoading ? "LOADING" : "NO DATA"}
            </div>
        </>
    );
};