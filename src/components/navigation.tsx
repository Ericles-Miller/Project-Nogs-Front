"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Heart, Users, Gift, User, Settings } from "lucide-react"

export function Navigation() {
  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-primary" />
            <span className="font-playfair font-bold text-2xl text-foreground">Voluntariar</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/projetos"
              className="flex items-center space-x-1 text-foreground hover:text-primary transition-colors"
            >
              <Users className="h-4 w-4" />
              <span>Projetos</span>
            </Link>
            <Link
              href="/campanhas"
              className="flex items-center space-x-1 text-foreground hover:text-primary transition-colors"
            >
              <Gift className="h-4 w-4" />
              <span>Campanhas</span>
            </Link>
            <Link
              href="/dashboard"
              className="flex items-center space-x-1 text-foreground hover:text-primary transition-colors"
            >
              <User className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/admin"
              className="flex items-center space-x-1 text-foreground hover:text-primary transition-colors"
            >
              <Settings className="h-4 w-4" />
              <span>Admin</span>
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost">Entrar</Button>
            </Link>
            <Link href="/cadastro">
              <Button>Cadastrar</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
