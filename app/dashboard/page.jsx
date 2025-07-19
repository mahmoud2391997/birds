"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticles } from "@/redux/slices/blogSlice";
import {
  BarChart3,
  Users,
  FileText,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  ThumbsUp,
  MessageSquare,
  AlertCircle,
  Loader2,
  RefreshCw,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/Button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Sample dashboard stats (still mock for now)
const stats = [
  {
    title: "Total Articles",
    value: "24",
    change: "+12%",
    trend: "up",
    icon: FileText,
  },
  {
    title: "Total Users",
    value: "573",
    change: "+18%",
    trend: "up",
    icon: Users,
  },
  {
    title: "Page Views",
    value: "14,892",
    change: "+32%",
    trend: "up",
    icon: Eye,
  },
  {
    title: "Engagement Rate",
    value: "8.2%",
    change: "-3%",
    trend: "down",
    icon: TrendingUp,
  },
];

export default function DashboardPage() {
  const dispatch = useDispatch();
  const { articles, status } = useSelector((state) => state.blog);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recentArticles, setRecentArticles] = useState([]);

  useEffect(() => {
    const loadArticles = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Fetch articles data
        await dispatch(fetchArticles()).unwrap();
      } catch (err) {
        setError(err.message || "Failed to load articles");
        console.error("Error loading articles:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadArticles();
  }, [dispatch]);

  useEffect(() => {
    // Process and prepare recent articles data once articles are loaded
    if (articles && articles.length > 0) {
      // Sort by date (newest first) and take the top 5
      const recent = [...articles]
        .sort(
          (a, b) =>
            new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt)
        )
        .slice(0, 5)
        .map((article) => ({
          _id: article._id,
          title: article.name || article.title,
          status: article.status || "Published",
          createdAt: article.date || article.createdAt,
          views: article.views || 0,
          likes: article.likes || 0,
          comments: article.comments || 0,
        }));

      setRecentArticles(recent);
    }
  }, [articles]);

  const handleRetry = async () => {
    await dispatch(fetchArticles());
    setError(null);
  };

  // Update stats based on actual article count
  const actualStats = [...stats];
  if (articles && articles.length > 0) {
    actualStats[0].value = articles.length.toString();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Welcome back! Here's an overview of your website performance.
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/articles/new">Create New Article</Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {actualStats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs">
                {stat.trend === "up" ? (
                  <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
                ) : (
                  <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
                )}
                <span
                  className={
                    stat.trend === "up" ? "text-green-500" : "text-red-500"
                  }
                >
                  {stat.change} from last month
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="articles">
        <TabsList>
          <TabsTrigger value="articles">Recent Articles</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="articles" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Articles</CardTitle>
              <CardDescription>
                Overview of your recently published and drafted articles.
              </CardDescription>
            </CardHeader>

            <CardContent>
              {error && (
                <Alert variant="destructive" className="mb-6">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription className="flex justify-between items-center">
                    <span>{error}</span>
                    <Button onClick={handleRetry} variant="outline" size="sm">
                      <RefreshCw className="mr-2 h-4 w-4" /> Retry
                    </Button>
                  </AlertDescription>
                </Alert>
              )}

              <div className="overflow-x-auto">
                {isLoading ? (
                  <div className="py-10 flex flex-col items-center justify-center text-center">
                    <Loader2 className="h-10 w-10 text-muted-foreground mb-4 animate-spin" />
                    <p className="text-muted-foreground">Loading articles...</p>
                  </div>
                ) : recentArticles.length === 0 ? (
                  <div className="py-10 text-center">
                    <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No articles found</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      Create your first article to see it displayed here.
                    </p>
                  </div>
                ) : (
                  <table className="w-full">
                    <thead>
                      <tr className="border-b text-left">
                        <th className="pb-3 font-medium">Title</th>
                        <th className="pb-3 font-medium">Status</th>
                        <th className="pb-3 font-medium">Date</th>
                        <th className="pb-3 font-medium text-right">Views</th>
                        <th className="pb-3 font-medium text-right">
                          Engagement
                        </th>
                        <th className="pb-3 font-medium text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentArticles.map((article) => (
                        <tr key={article._id} className="border-b">
                          <td className="py-3">{article.title}</td>
                          <td className="py-3">
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                article.status === "Published"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                  : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                              }`}
                            >
                              {article.status}
                            </span>
                          </td>
                          <td className="py-3 text-muted-foreground">
                            {article.createdAt
                              ? new Date(article.createdAt).toLocaleDateString()
                              : "N/A"}
                          </td>
                          <td className="py-3 text-right">
                            {article.views.toLocaleString()}
                          </td>
                          <td className="py-3 text-right">
                            <div className="flex items-center justify-end space-x-2">
                              <span className="flex items-center text-muted-foreground">
                                <ThumbsUp className="mr-1 h-3 w-3" />
                                {article.likes}
                              </span>
                              <span className="flex items-center text-muted-foreground">
                                <MessageSquare className="mr-1 h-3 w-3" />
                                {article.comments}
                              </span>
                            </div>
                          </td>
                          <td className="py-3 text-right">
                            <Button variant="ghost" size="sm" asChild>
                              <Link href={`/dashboard/articles/${article._id}`}>
                                Edit
                              </Link>
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <div className="text-sm text-muted-foreground">
                Showing {recentArticles.length} of {articles.length || 0}{" "}
                articles
              </div>
              <Button variant="outline" asChild>
                <Link href="/dashboard/articles">View All Articles</Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Website Analytics</CardTitle>
              <CardDescription>
                Traffic and engagement metrics for your website.
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="mx-auto h-16 w-16 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">
                  Analytics Visualization
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Detailed analytics charts and graphs would be displayed here.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
