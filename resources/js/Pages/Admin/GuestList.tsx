import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm, usePage } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import {
    Plus,
    Upload,
    Download,
    Search,
    Eye,
    EyeOff,
    Copy,
    Pencil,
    Trash2,
    ExternalLink,
    ChevronDown,
    FileText,
    Link2,
    AlertTriangle,
    CheckCircle2,
    XCircle,
} from "lucide-react";
import { useState, FormEvent } from "react";

// --- Interfaces ---
interface Guest {
    id: number;
    name: string;
    slug: string;
    phone: string | null;
    address: string | null;
    invitation_type: string;
    is_opened: boolean;
    opened_at: string | null;
    created_at: string;
}

interface Pagination {
    data: Guest[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface ImportError {
    row: number;
    name: string;
    errors: string[];
}

interface ImportResults {
    success: number;
    failed: number;
    errors: ImportError[];
}

interface Props {
    auth: any;
    guests: Pagination;
    filters: {
        search?: string;
        type?: string;
        opened?: string;
    };
    // Menangkap data flash dari Laravel
    flash: {
        success?: string;
        error?: string;
        import_results?: ImportResults;
    };
}

export default function GuestList({ auth, guests, filters }: Props) {
    // Mengambil data flash secara reaktif menggunakan usePage
    const { flash } = usePage<any>().props;
    const importResults = flash?.import_results as ImportResults | undefined;

    const [searchTerm, setSearchTerm] = useState(filters.search || "");
    const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);

    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: "",
        phone: "",
        address: "",
        invitation_type: "lainnya",
    });

    const uploadForm = useForm({
        file: null as File | null,
    });

    const handleSearch = (e: FormEvent) => {
        e.preventDefault();
        router.get(
            route("admin.guests.index"),
            { search: searchTerm },
            { preserveState: true },
        );
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (selectedGuest) {
            put(route("admin.guests.update", selectedGuest.id), {
                onSuccess: () => {
                    setIsEditDialogOpen(false);
                    reset();
                },
            });
        } else {
            post(route("admin.guests.store"), {
                onSuccess: () => {
                    setIsAddDialogOpen(false);
                    reset();
                },
            });
        }
    };

    const handleDelete = (guest: Guest) => {
        if (confirm(`Hapus ${guest.name}?`)) {
            router.delete(route("admin.guests.destroy", guest.id));
        }
    };

    const handleUpload = (e: FormEvent) => {
        e.preventDefault();
        if (!uploadForm.data.file) return;

        uploadForm.post(route("admin.guests.import"), {
            onSuccess: () => {
                setIsUploadDialogOpen(false);
                uploadForm.reset();
            },
        });
    };

    const copyInvitationLink = (slug: string) => {
        const url = `${window.location.origin}/metatah-tjikra-family/to/${slug}`;
        navigator.clipboard.writeText(url);
        alert("Link berhasil disalin!");
    };

    const openEditDialog = (guest: Guest) => {
        setSelectedGuest(guest);
        setData({
            name: guest.name,
            phone: guest.phone || "",
            address: guest.address || "",
            invitation_type: guest.invitation_type,
        });
        setIsEditDialogOpen(true);
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Daftar Tamu
                </h2>
            }
        >
            <Head title="Daftar Tamu" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {/* --- ALERT REPORT IMPORT (KODE BARU) --- */}
                    {importResults && (
                        <Card
                            className={`border-l-4 ${importResults.failed > 0 ? "border-l-amber-500" : "border-l-green-500"}`}
                        >
                            <CardHeader className="pb-3">
                                <div className="flex items-center gap-2">
                                    {importResults.failed > 0 ? (
                                        <AlertTriangle className="h-5 w-5 text-amber-600" />
                                    ) : (
                                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                                    )}
                                    <CardTitle className="text-lg">
                                        Laporan Import Selesai
                                    </CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground mb-4">
                                    Berhasil diproses:{" "}
                                    <span className="font-bold text-green-600">
                                        {importResults.success}
                                    </span>{" "}
                                    | Gagal:{" "}
                                    <span className="font-bold text-red-600">
                                        {importResults.failed}
                                    </span>
                                </p>

                                {importResults.failed > 0 && (
                                    <div className="rounded-md border bg-slate-50 overflow-hidden">
                                        <Table>
                                            <TableHeader className="bg-slate-100">
                                                <TableRow>
                                                    <TableHead className="w-20 py-2">
                                                        Baris
                                                    </TableHead>
                                                    <TableHead className="py-2">
                                                        Nama
                                                    </TableHead>
                                                    <TableHead className="py-2">
                                                        Penyebab Gagal
                                                    </TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {importResults.errors.map(
                                                    (err, idx) => (
                                                        <TableRow key={idx}>
                                                            <TableCell className="py-2 text-xs font-mono">
                                                                {err.row}
                                                            </TableCell>
                                                            <TableCell className="py-2 text-xs font-medium">
                                                                {err.name}
                                                            </TableCell>
                                                            <TableCell className="py-2 text-xs text-red-600">
                                                                {err.errors.join(
                                                                    ", ",
                                                                )}
                                                            </TableCell>
                                                        </TableRow>
                                                    ),
                                                )}
                                            </TableBody>
                                        </Table>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    )}

                    <Card>
                        <CardHeader>
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                <CardTitle>Manajemen Tamu Undangan</CardTitle>
                                <div className="flex flex-wrap gap-2">
                                    {/* Add Guest */}
                                    <Dialog
                                        open={isAddDialogOpen}
                                        onOpenChange={setIsAddDialogOpen}
                                    >
                                        <DialogTrigger asChild>
                                            <Button size="sm">
                                                <Plus className="h-4 w-4 mr-2" />
                                                Tambah Tamu
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <form onSubmit={handleSubmit}>
                                                <DialogHeader>
                                                    <DialogTitle>
                                                        Tambah Tamu Baru
                                                    </DialogTitle>
                                                </DialogHeader>
                                                <div className="grid gap-4 py-4">
                                                    <div>
                                                        <label className="text-sm font-medium">
                                                            Nama Lengkap *
                                                        </label>
                                                        <Input
                                                            value={data.name}
                                                            onChange={(e) =>
                                                                setData(
                                                                    "name",
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            required
                                                        />
                                                        {errors.name && (
                                                            <p className="text-xs text-red-500 mt-1">
                                                                {errors.name}
                                                            </p>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <label className="text-sm font-medium">
                                                            No. Telepon
                                                        </label>
                                                        <Input
                                                            value={data.phone}
                                                            onChange={(e) =>
                                                                setData(
                                                                    "phone",
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="text-sm font-medium">
                                                            Alamat
                                                        </label>
                                                        <Input
                                                            value={data.address}
                                                            onChange={(e) =>
                                                                setData(
                                                                    "address",
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="text-sm font-medium">
                                                            Kategori
                                                        </label>
                                                        <select
                                                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                                            value={
                                                                data.invitation_type
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "invitation_type",
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                        >
                                                            <option value="keluarga">
                                                                Keluarga
                                                            </option>
                                                            <option value="teman">
                                                                Teman
                                                            </option>
                                                            <option value="kerja">
                                                                Kerja
                                                            </option>
                                                            <option value="lainnya">
                                                                Lainnya
                                                            </option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <DialogFooter>
                                                    <Button
                                                        type="submit"
                                                        disabled={processing}
                                                    >
                                                        Simpan
                                                    </Button>
                                                </DialogFooter>
                                            </form>
                                        </DialogContent>
                                    </Dialog>

                                    {/* Import CSV */}
                                    <Dialog
                                        open={isUploadDialogOpen}
                                        onOpenChange={setIsUploadDialogOpen}
                                    >
                                        <DialogTrigger asChild>
                                            <Button size="sm" variant="outline">
                                                <Upload className="h-4 w-4 mr-2" />
                                                Import CSV
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <form onSubmit={handleUpload}>
                                                <DialogHeader>
                                                    <DialogTitle>
                                                        Import Tamu
                                                    </DialogTitle>
                                                    <DialogDescription>
                                                        Upload file CSV/Excel
                                                        (Pemisah titik koma ';'
                                                        didukung).
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <div className="grid gap-4 py-4">
                                                    <Input
                                                        type="file"
                                                        accept=".csv,.xlsx,.xls"
                                                        onChange={(e) =>
                                                            uploadForm.setData(
                                                                "file",
                                                                e.target
                                                                    .files?.[0] ||
                                                                    null,
                                                            )
                                                        }
                                                        required
                                                    />
                                                </div>
                                                <DialogFooter>
                                                    <Button
                                                        type="submit"
                                                        disabled={
                                                            uploadForm.processing
                                                        }
                                                    >
                                                        Upload
                                                    </Button>
                                                </DialogFooter>
                                            </form>
                                        </DialogContent>
                                    </Dialog>

                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button size="sm" variant="outline">
                                                <Download className="h-4 w-4 mr-2" />{" "}
                                                Export{" "}
                                                <ChevronDown className="h-4 w-4 ml-2" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem asChild>
                                                <a
                                                    href={route(
                                                        "admin.guests.export.links",
                                                    )}
                                                    className="flex items-center"
                                                >
                                                    <Link2 className="h-4 w-4 mr-2" />{" "}
                                                    Invitation Links
                                                </a>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem asChild>
                                                <a
                                                    href={route(
                                                        "admin.guests.export.full",
                                                    )}
                                                    className="flex items-center"
                                                >
                                                    <FileText className="h-4 w-4 mr-2" />{" "}
                                                    Full Data
                                                </a>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <form
                                onSubmit={handleSearch}
                                className="mb-6 flex gap-2"
                            >
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <Input
                                        placeholder="Cari nama atau telepon..."
                                        value={searchTerm}
                                        onChange={(e) =>
                                            setSearchTerm(e.target.value)
                                        }
                                        className="pl-10"
                                    />
                                </div>
                                <Button type="submit">Cari</Button>
                            </form>

                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Nama</TableHead>
                                            <TableHead>Telepon</TableHead>
                                            <TableHead>Kategori</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead className="text-right">
                                                Aksi
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {guests.data.length > 0 ? (
                                            guests.data.map((guest) => (
                                                <TableRow key={guest.id}>
                                                    <TableCell className="font-medium">
                                                        {guest.name}
                                                    </TableCell>
                                                    <TableCell>
                                                        {guest.phone || "-"}
                                                    </TableCell>
                                                    <TableCell>
                                                        <span className="capitalize text-xs bg-gray-100 px-2 py-1 rounded">
                                                            {
                                                                guest.invitation_type
                                                            }
                                                        </span>
                                                    </TableCell>
                                                    <TableCell>
                                                        {guest.is_opened ? (
                                                            <div className="flex items-center gap-1 text-green-600 text-xs">
                                                                <Eye className="h-3 w-3" />{" "}
                                                                Dibuka
                                                            </div>
                                                        ) : (
                                                            <div className="flex items-center gap-1 text-orange-600 text-xs">
                                                                <EyeOff className="h-3 w-3" />{" "}
                                                                Belum
                                                            </div>
                                                        )}
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <div className="flex justify-end gap-1">
                                                            <Button
                                                                size="sm"
                                                                variant="ghost"
                                                                onClick={() =>
                                                                    copyInvitationLink(
                                                                        guest.slug,
                                                                    )
                                                                }
                                                            >
                                                                <Copy className="h-4 w-4" />
                                                            </Button>
                                                            <Button
                                                                size="sm"
                                                                variant="ghost"
                                                                onClick={() =>
                                                                    openEditDialog(
                                                                        guest,
                                                                    )
                                                                }
                                                            >
                                                                <Pencil className="h-4 w-4" />
                                                            </Button>
                                                            <Button
                                                                size="sm"
                                                                variant="ghost"
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        guest,
                                                                    )
                                                                }
                                                                className="text-red-600"
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell
                                                    colSpan={5}
                                                    className="text-center py-8"
                                                >
                                                    Tidak ada data tamu
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </div>

                            {/* Pagination */}
                            {guests.last_page > 1 && (
                                <div className="flex items-center justify-between mt-6">
                                    <p className="text-xs text-muted-foreground">
                                        Menampilkan {guests.data.length} dari{" "}
                                        {guests.total} tamu
                                    </p>
                                    <div className="flex gap-1">
                                        {Array.from(
                                            { length: guests.last_page },
                                            (_, i) => i + 1,
                                        ).map((page) => (
                                            <Link
                                                key={page}
                                                href={route(
                                                    "admin.guests.index",
                                                    { page, ...filters },
                                                )}
                                                className={`px-3 py-1 text-xs rounded ${page === guests.current_page ? "bg-primary text-white" : "bg-gray-100 hover:bg-gray-200"}`}
                                            >
                                                {page}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Edit Dialog */}
                    <Dialog
                        open={isEditDialogOpen}
                        onOpenChange={setIsEditDialogOpen}
                    >
                        <DialogContent>
                            <form onSubmit={handleSubmit}>
                                <DialogHeader>
                                    <DialogTitle>Edit Tamu</DialogTitle>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div>
                                        <label className="text-sm font-medium">
                                            Nama Lengkap *
                                        </label>
                                        <Input
                                            value={data.name}
                                            onChange={(e) =>
                                                setData("name", e.target.value)
                                            }
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium">
                                            No. Telepon
                                        </label>
                                        <Input
                                            value={data.phone}
                                            onChange={(e) =>
                                                setData("phone", e.target.value)
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium">
                                            Alamat
                                        </label>
                                        <Input
                                            value={data.address}
                                            onChange={(e) =>
                                                setData(
                                                    "address",
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium">
                                            Kategori
                                        </label>
                                        <select
                                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                            value={data.invitation_type}
                                            onChange={(e) =>
                                                setData(
                                                    "invitation_type",
                                                    e.target.value,
                                                )
                                            }
                                        >
                                            <option value="keluarga">
                                                Keluarga
                                            </option>
                                            <option value="teman">Teman</option>
                                            <option value="kerja">Kerja</option>
                                            <option value="lainnya">
                                                Lainnya
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button type="submit" disabled={processing}>
                                        Update
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
