import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Users, Eye, EyeOff, TrendingUp } from "lucide-react";

interface Stats {
    total_guests: number;
    opened_invitations: number;
    unopened_invitations: number;
    opening_rate: number;
}

interface RecentGuest {
    id: number;
    name: string;
    opened_at: string;
}

interface StatsByType {
    invitation_type: string;
    total: number;
    opened: number;
}

interface Props {
    auth: any;
    stats: Stats;
    recentOpened: RecentGuest[];
    statsByType: StatsByType[];
}

export default function Dashboard({
    auth,
    stats,
    recentOpened,
    statsByType,
}: Props) {
    const formatDateTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString("id-ID", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {/* Total Guests */}
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Total Undangan
                                </CardTitle>
                                <Users className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {stats.total_guests}
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Total tamu yang diundang
                                </p>
                            </CardContent>
                        </Card>

                        {/* Opened */}
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Sudah Dibuka
                                </CardTitle>
                                <Eye className="h-4 w-4 text-green-600" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-green-600">
                                    {stats.opened_invitations}
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Undangan yang sudah dibuka
                                </p>
                            </CardContent>
                        </Card>

                        {/* Unopened */}
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Belum Dibuka
                                </CardTitle>
                                <EyeOff className="h-4 w-4 text-orange-600" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-orange-600">
                                    {stats.unopened_invitations}
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Undangan yang belum dibuka
                                </p>
                            </CardContent>
                        </Card>

                        {/* Opening Rate */}
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Opening Rate
                                </CardTitle>
                                <TrendingUp className="h-4 w-4 text-blue-600" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-blue-600">
                                    {stats.opening_rate}%
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Persentase pembukaan
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Stats by Type */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Statistik per Kategori</CardTitle>
                                <CardDescription>
                                    Undangan berdasarkan tipe
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {statsByType.map((stat) => {
                                        const openingRate =
                                            stat.total > 0
                                                ? (stat.opened / stat.total) *
                                                  100
                                                : 0;
                                        return (
                                            <div key={stat.invitation_type}>
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-sm font-medium capitalize">
                                                        {stat.invitation_type}
                                                    </span>
                                                    <span className="text-sm text-muted-foreground">
                                                        {stat.opened}/
                                                        {stat.total} (
                                                        {openingRate.toFixed(1)}
                                                        %)
                                                    </span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                    <div
                                                        className="bg-blue-600 h-2 rounded-full transition-all"
                                                        style={{
                                                            width: `${openingRate}%`,
                                                        }}
                                                    ></div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Recent Opened */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Baru Dibuka</CardTitle>
                                <CardDescription>
                                    10 undangan terakhir yang dibuka
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {recentOpened.length > 0 ? (
                                        recentOpened.map((guest) => (
                                            <div
                                                key={guest.id}
                                                className="flex items-center justify-between py-2 border-b last:border-0"
                                            >
                                                <div>
                                                    <p className="text-sm font-medium">
                                                        {guest.name}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {formatDateTime(
                                                            guest.opened_at,
                                                        )}
                                                    </p>
                                                </div>
                                                <Eye className="h-4 w-4 text-green-600" />
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-sm text-muted-foreground text-center py-4">
                                            Belum ada undangan yang dibuka
                                        </p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
