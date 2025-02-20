using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Backend.Models;

public partial class AdatbazisContext : DbContext
{
    public AdatbazisContext()
    {
    }

    public AdatbazisContext(DbContextOptions<AdatbazisContext> options)
        : base(options)
    {
    }

    public virtual DbSet<User> Users { get; set; }
    public virtual DbSet<Tasks> Tasks { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured)
        {
            var configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .Build();
            optionsBuilder.UseMySQL(configuration.GetConnectionString("DefaultConnection"));
        }
    }

    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("user");

            entity.HasIndex(e => e.Email, "Email").IsUnique();

            entity.HasIndex(e => e.FelhasznaloNev, "FelhasznaloNev").IsUnique();

            entity.Property(e => e.Id).HasColumnType("int(11)");
            entity.Property(e => e.Aktiv).HasColumnType("int(1)");
            entity.Property(e => e.Email).HasMaxLength(100);
            entity.Property(e => e.FelhasznaloNev).HasMaxLength(100);
            entity.Property(e => e.Hash)
                .HasMaxLength(64)
                .HasColumnName("HASH");
            entity.Property(e => e.Jogosultsag).HasColumnType("int(1)");
            entity.Property(e => e.RegisztracioDatuma)
                .HasDefaultValueSql("'current_timestamp()'")
                .HasColumnType("datetime");
            entity.Property(e => e.Salt)
                .HasMaxLength(64)
                .HasColumnName("SALT");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
