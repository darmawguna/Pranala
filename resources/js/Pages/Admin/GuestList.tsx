import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
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
} from "lucide-react";
import { useState, FormEvent } from "react";

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

interface Props {
    auth: any;
    guests: Pagination;
    filters: {
        search?: string;
        type?: string;
        opened?: string;
    };
}

export default function GuestList({ auth, guests, filters }: Props) {
    const [searchTerm, setSearchTerm] = useState(filters.search || "");
    const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);

    // Form for adding/editing guest
    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: "",
        phone: "",
        address: "",
        invitation_type: "lainnya",
    });

    // Upload form
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
                    alert("Tamu berhasil diupdate!");
                },
            });
        } else {
            post(route("admin.guests.store"), {
                onSuccess: () => {
                    setIsAddDialogOpen(false);
                    reset();
                    alert("Tamu berhasil ditambahkan!");
                },
            });
        }
    };

    const handleDelete = (guest: Guest) => {
        if (confirm(`Hapus ${guest.name}?`)) {
            router.delete(route("admin.guests.destroy", guest.id), {
                onSuccess: () => {
                    alert("Tamu berhasil dihapus!");
                },
            });
        }
    };

    const handleUpload = (e: FormEvent) => {
        e.preventDefault();
        if (!uploadForm.data.file) return;

        const formData = new FormData();
        formData.append("file", uploadForm.data.file);

        router.post(route("admin.guests.import"), formData, {
            onSuccess: () => {
                setIsUploadDialogOpen(false);
                uploadForm.reset();
                alert("Import berhasil!");
            },
            onError: () => {
                alert("Import gagal!");
            },
        });
    };

    const copyInvitationLink = (slug: string) => {
        const url = `${window.location.origin}/to/${slug}`;
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
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader>
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                <CardTitle>Manajemen Tamu Undangan</CardTitle>
                                <div className="flex flex-wrap gap-2">
                                    {/* Add Guest Button */}
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
                                                    <DialogDescription>
                                                        Tambahkan tamu undangan
                                                        satu per satu
                                                    </DialogDescription>
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
                                                            placeholder="I Made Agus Susila"
                                                            required
                                                        />
                                                        {errors.name && (
                                                            <p className="text-sm text-red-600 mt-1">
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
                                                            placeholder="08123456789"
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
                                                            placeholder="Denpasar, Bali"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="text-sm font-medium">
                                                            Kategori
                                                        </label>
                                                        <select
                                                            className="w-full rounded-md border border-gray-300 p-2"
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

                                    {/* Upload CSV Button */}
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
                                                        Import Tamu dari
                                                        CSV/Excel
                                                    </DialogTitle>
                                                    <DialogDescription>
                                                        Upload file CSV atau
                                                        Excel dengan format:
                                                        name, phone, address,
                                                        type
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <div className="grid gap-4 py-4">
                                                    <div>
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
                                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                                        <p className="text-sm text-blue-800 mb-2">
                                                            <strong>
                                                                Format CSV:
                                                            </strong>
                                                        </p>
                                                        <code className="text-xs bg-white px-2 py-1 rounded block">
                                                            name,phone,address,type
                                                            <br />
                                                            "I Made
                                                            Agus",0812345678,"Denpasar",keluarga
                                                        </code>
                                                    </div>
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

                                    {/* Export Dropdown Button */}
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button size="sm" variant="outline">
                                                <Download className="h-4 w-4 mr-2" />
                                                Export
                                                <ChevronDown className="h-4 w-4 ml-2" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent
                                            align="end"
                                            className="w-56"
                                        >
                                            <DropdownMenuLabel>
                                                Pilih Format Export
                                            </DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem asChild>
                                                <a
                                                    href={route(
                                                        "admin.guests.export.links",
                                                    )}
                                                    className="flex items-center cursor-pointer"
                                                >
                                                    <Link2 className="h-4 w-4 mr-2" />
                                                    <div className="flex flex-col">
                                                        <span className="font-medium">
                                                            Invitation Links
                                                        </span>
                                                        <span className="text-xs text-muted-foreground">
                                                            Nama + Link (untuk
                                                            share)
                                                        </span>
                                                    </div>
                                                </a>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem asChild>
                                                <a
                                                    href={route(
                                                        "admin.guests.export.full",
                                                    )}
                                                    className="flex items-center cursor-pointer"
                                                >
                                                    <FileText className="h-4 w-4 mr-2" />
                                                    <div className="flex flex-col">
                                                        <span className="font-medium">
                                                            Full Data
                                                        </span>
                                                        <span className="text-xs text-muted-foreground">
                                                            Semua field (untuk
                                                            backup)
                                                        </span>
                                                    </div>
                                                </a>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {/* Search & Filters */}
                            <form onSubmit={handleSearch} className="mb-6">
                                <div className="flex gap-2">
                                    <div className="relative flex-1">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                        <Input
                                            type="search"
                                            placeholder="Cari nama atau telepon..."
                                            value={searchTerm}
                                            onChange={(e) =>
                                                setSearchTerm(e.target.value)
                                            }
                                            className="pl-10"
                                        />
                                    </div>
                                    <Button type="submit">Cari</Button>
                                </div>
                            </form>

                            {/* Table */}
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Nama</TableHead>
                                            <TableHead>Telepon</TableHead>
                                            <TableHead>Kategori</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Link</TableHead>
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
                                                        <span className="capitalize text-sm bg-gray-100 px-2 py-1 rounded">
                                                            {
                                                                guest.invitation_type
                                                            }
                                                        </span>
                                                    </TableCell>
                                                    <TableCell>
                                                        {guest.is_opened ? (
                                                            <div className="flex items-center gap-1 text-green-600">
                                                                <Eye className="h-4 w-4" />
                                                                <span className="text-sm">
                                                                    Dibuka
                                                                </span>
                                                            </div>
                                                        ) : (
                                                            <div className="flex items-center gap-1 text-orange-600">
                                                                <EyeOff className="h-4 w-4" />
                                                                <span className="text-sm">
                                                                    Belum
                                                                </span>
                                                            </div>
                                                        )}
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex gap-1">
                                                            <Button
                                                                size="sm"
                                                                variant="ghost"
                                                                onClick={() =>
                                                                    copyInvitationLink(
                                                                        guest.slug,
                                                                    )
                                                                }
                                                                title="Copy link"
                                                            >
                                                                <Copy className="h-4 w-4" />
                                                            </Button>
                                                            <Button
                                                                size="sm"
                                                                variant="ghost"
                                                                asChild
                                                                title="Buka undangan"
                                                            >
                                                                <a
                                                                    href={`/to/${guest.slug}`}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                >
                                                                    <ExternalLink className="h-4 w-4" />
                                                                </a>
                                                            </Button>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <div className="flex justify-end gap-2">
                                                            <Button
                                                                size="sm"
                                                                variant="ghost"
                                                                onClick={() =>
                                                                    openEditDialog(
                                                                        guest,
                                                                    )
                                                                }
                                                                title="Edit"
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
                                                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                                                title="Hapus"
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
                                                    colSpan={6}
                                                    className="text-center py-8 text-muted-foreground"
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
                                    <p className="text-sm text-muted-foreground">
                                        Menampilkan {guests.data.length} dari{" "}
                                        {guests.total} data
                                    </p>
                                    <div className="flex gap-2">
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
                                                className={`px-3 py-1 rounded ${
                                                    page === guests.current_page
                                                        ? "bg-blue-600 text-white"
                                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                                }`}
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
                                    <DialogDescription>
                                        Update informasi tamu undangan
                                    </DialogDescription>
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
                                            className="w-full rounded-md border border-gray-300 p-2"
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
