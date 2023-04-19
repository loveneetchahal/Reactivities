using System.Security.Claims;
using API.DTOs;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class AccountController : ControllerBase
{
    private readonly UserManager<AppUser> _userManager;
    private readonly TokenService _tokenService;

    public AccountController(UserManager<AppUser> userManager, TokenService tokenService)
    {
        _userManager = userManager;
        _tokenService = tokenService;
    }

    [AllowAnonymous]
    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
    {
        var user = await _userManager.FindByEmailAsync(loginDto.Email);

        if (user is null) return BadRequest("Email not found");

        var result = await _userManager.CheckPasswordAsync(user, loginDto.Password);

        if (result)
        {
            return CreateUserObject(user);
        }

        return BadRequest("Wrong password");
    }

    [AllowAnonymous]
    [HttpPost("register")]
    public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
    {
        if (await _userManager.Users.AnyAsync(x => x.Email == registerDto.Email))
            return BadRequest("Email already exists");
        if (await _userManager.Users.AnyAsync(x => x.UserName == registerDto.UserName))
            return BadRequest("Username already exists");

        var user = new AppUser()
        {
            DisplayName = registerDto.DisplayName,
            Email = registerDto.Email,
            UserName = registerDto.UserName
        };
        

        var result = await _userManager.CreateAsync(user, registerDto.Password);

        if (result.Succeeded)
        {
            return CreateUserObject(user);
        }

        return BadRequest(result.Errors);
    }
    
    [HttpGet]
    public async Task<ActionResult<UserDto>> GetCurrentUser()
    {
        var user = await _userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email)!);
        var userDto = CreateUserObject(user);
        return userDto;
    }
    private UserDto CreateUserObject(AppUser user)
    {
        return new UserDto()
        {
            DisplayName = user.DisplayName,
            UserName = user.UserName,
            Token = _tokenService.CreateToken(user),
            Image = null
        };
    }
}