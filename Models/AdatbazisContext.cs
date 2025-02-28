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

    public virtual DbSet<CategoryType> CategoryTypes { get; set; }

    public virtual DbSet<PredefinedTask> PredefinedTasks { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<UserTask> UserTasks { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseMySQL("SERVER=localhost;PORT=3306;DATABASE=adatbazis;USER=root;PASSWORD=;SSL MODE=none;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<CategoryType>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("category_type");

            entity.HasIndex(e => e.Name, "name").IsUnique();

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.Name).HasColumnName("name");
        });

        modelBuilder.Entity<PredefinedTask>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("predefined_tasks");

            entity.HasIndex(e => e.CategoryId, "category_id");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.CategoryId)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("category_id");
            entity.Property(e => e.Icon)
                .HasMaxLength(10)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("icon");
            entity.Property(e => e.Text)
                .HasMaxLength(255)
                .HasColumnName("text");

            entity.HasOne(d => d.Category).WithMany(p => p.PredefinedTasks)
                .HasForeignKey(d => d.CategoryId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("predefined_tasks_ibfk_1");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("user");

            entity.HasIndex(e => e.Email, "Email").IsUnique();

            entity.HasIndex(e => e.FelhasznaloNev, "FelhasznaloNev").IsUnique();

            entity.Property(e => e.Id).HasColumnType("int(10) unsigned");
            entity.Property(e => e.Aktiv)
                .HasDefaultValueSql("'1'")
                .HasColumnType("int(11)");
            entity.Property(e => e.Hash).HasMaxLength(255);
            entity.Property(e => e.Jogosultsag).HasColumnType("int(11)");
            entity.Property(e => e.Profilkep)
                .HasMaxLength(255)
                .HasDefaultValueSql("'''default.jpg'''");
            entity.Property(e => e.RegisztracioDatuma)
                .HasDefaultValueSql("'current_timestamp()'")
                .HasColumnType("datetime");
            entity.Property(e => e.Salt).HasMaxLength(255);
            entity.Property(e => e.Streak)
                .HasColumnType("int(11) unsigned")
                .HasColumnName("streak");
            entity.Property(e => e.Xp)
                .HasColumnType("int(11) unsigned")
                .HasColumnName("xp");
        });

        modelBuilder.Entity<UserTask>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("user_tasks");

            entity.HasIndex(e => e.CategoryId, "CategoryId");

            entity.HasIndex(e => e.UserId, "UserId");

            entity.HasIndex(e => e.UserId, "UserId_2");

            entity.Property(e => e.Id).HasColumnType("int(10) unsigned");
            entity.Property(e => e.CategoryId).HasColumnType("int(11)");
            entity.Property(e => e.EndTime).HasMaxLength(5);
            entity.Property(e => e.StartTime).HasMaxLength(5);
            entity.Property(e => e.TaskDate).HasColumnType("date");
            entity.Property(e => e.UserId).HasColumnType("int(10) unsigned");

            entity.HasOne(d => d.User).WithMany(p => p.UserTasks)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("user_tasks_ibfk_1");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
