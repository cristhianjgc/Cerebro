﻿CREATE TABLE [dbo].[Users]
(
	[Id] NVARCHAR(50) NOT NULL DEFAULT NEWID(),
	[Email] NVARCHAR(50) NULL,
	[Nickname] NVARCHAR(50) NULL,
	[Username] NVARCHAR(50) NULL,
	[CreatedAt] DATETIME2(7) NOT NULL DEFAULT GETDATE(),
	CONSTRAINT [PK_Users] PRIMARY KEY ([Id])
)
