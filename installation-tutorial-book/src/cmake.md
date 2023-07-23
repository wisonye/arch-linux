# CMake

The whole purpose by using `cmake` is that:

- Use it to generate the complicated `Makefile` for your whole project

- Separate the building process out of your project source code, as everything
`cmake` needs just a extra `build` folder and that folder should place into the
`.gitignore`.

- Project structure that uses `CMake`

    All `CMake` needs just a `CMakeLists.txt` configuration file and a `build`
    folder. You use the `CMake language` to write that config file.

    `CMakeLists.txt` and `build` folder should located in the root of the
    project like below:

    ```bash
    .
    ├── CMakeLists.txt
    ├── README.md
    ├── build
    │   ├── CMakeCache.txt          // All generated `CMAKE_XXX` settings
    │   ├── CMakeFiles
    │   ├── Makefile                // The generated `Makefile`
    │   ├── cmake_install.cmake
    │   └── compile_commands.json   // For LSP server
    └── src
        ├── main.c
        ├── main_need_lib.c
        ├── pointer_demo.c
        ├── string_demo.c
        ├── struct_demo.c
        └── utils
    ```

    </br>

### 1. How to generate `Debug` and `Release` build configuration

- `Debug` build

    ```bash
    # If doesn't exists yet
    mkdir build

    cd build

    cmake -DCMAKE_EXPORT_COMPILE_COMMANDS=1 \
        -DCMAKE_SYSTEM_NAME=(uname -s) \
        -DCMAKE_C_COMPILER=(which clang) \
        -DCMAKE_C_FLAGS="-std=gnu17" \
        -DCMAKE_BUILD_TYPE=Debug \
    ..


    # -- The C compiler identification is Clang 14.0.6
    # -- Detecting C compiler ABI info
    # -- Detecting C compiler ABI info - done
    # -- Check for working C compiler: /usr/local/opt/llvm/bin/clang - skipped
    # -- Detecting C compile features
    # -- Detecting C compile features - done
    # >>> CMAKE_SYSTEM_NAME: Darwin
    # >>> CMAKE_BUILD_TYPE: Debug
    # >>> CMAKE_C_COMPILER: /usr/local/opt/llvm/bin/clang
    # >>> CMAKE_C_FLAGS: -std=gnu17
    # >>> CMAKE_C_FLAGS_DEBUG: -g
    # >>> CMAKE_C_FLAGS_RELEASE: -O3 -DNDEBUG
    # -- Configuring done
    # -- Generating done
    # -- Build files have been written to: /Users/wison/CPP/c-tutorial/build
    ```

    parameters meaning:

    - `-DCMAKE_EXPORT_COMPILE_COMMANDS=1`
        Use to generate the `compile_commands.json` file for LSP server usage
        purpose

    - `-DCMAKE_SYSTEM_NAME=(uname -s)`

        Use to set the `CMAKE_SYSTEM_NAME` env var. Actually, that's the default
        settings even you don't provide, you can add it just in case:)

    - `-DCMAKE_C_COMPILER=(which clang)`

        Use to set the `CMAKE_C_COMPILER` env var. It will use the system default
        C compiler if you don't provide it, usually it points to the default `cc`
        executable in your system. If you want to make sure to use the particular
        compiler (or different version), then you better set it.

    - `-DCMAKE_C_FLAGS="-std=gnu17"`

        Use to set the `CMAKE_C_FLAGS` env var, it's empty by default.

    - `-DCMAKE_BUILD_TYPE=Debug`

        Tell `cmake` that you do want a debug build type which will use the
        `CMAKE_C_FLAGS_DEBUG` flag on the `CMAKE_C_COMPILER` command when compiling
        your project.

    </br>


- `Release` build

    ```bash
    # If doesn't exists yet
    mkdir build

    cd build

    cmake -DCMAKE_EXPORT_COMPILE_COMMANDS=1 \
        -DCMAKE_SYSTEM_NAME=(uname -s) \
        -DCMAKE_C_COMPILER=(which clang) \
        -DCMAKE_C_FLAGS="-std=gnu17" \
        -DCMAKE_BUILD_TYPE=Release \
    ..

    # -- The C compiler identification is Clang 14.0.6
    # -- Detecting C compiler ABI info
    # -- Detecting C compiler ABI info - done
    # -- Check for working C compiler: /usr/local/opt/llvm/bin/clang - skipped
    # -- Detecting C compile features
    # -- Detecting C compile features - done
    # >>> CMAKE_SYSTEM_NAME: Darwin
    # >>> CMAKE_BUILD_TYPE: Release
    # >>> CMAKE_C_COMPILER: /usr/local/opt/llvm/bin/clang
    # >>> CMAKE_C_FLAGS: -std=gnu17
    # >>> CMAKE_C_FLAGS_DEBUG: -g
    # >>> CMAKE_C_FLAGS_RELEASE: -O3 -DNDEBUG
    # -- Configuring done
    # -- Generating done
    # -- Build files have been written to: /Users/wison/CPP/c-tutorial/build
    ```

    parameters meaning:

    - `-DCMAKE_BUILD_TYPE=Release`

        Tell `cmake` that you do want a release build type which will use the
        `CMAKE_C_FLAGS_RELEASE` flag on the `CMAKE_C_COMPILER` command when
        compiling your project.

        </br>

- C++ project

    The example above is for `C` project, you just need a very small change if
    you're dealing with a `C++` project:

    - Change all `CMAKE_C_` to `CMAKE_CXX_`

    For example:

    ```bash
    cmake -DCMAKE_EXPORT_COMPILE_COMMANDS=1 \
        -DCMAKE_SYSTEM_NAME=(uname -s) \
        -DCMAKE_CXX_COMPILER=(which clang++) \
        -DCMAKE_CXX_FLAGS="-stdlib=libstdc++ -std=gnu++17" \
        -DCMAKE_BUILD_TYPE=Release \
    ..
    ```

    </br>

- How to update `cmake` configuration

    You got a few ways to do that:

    - Change your parameters and re-run `cmake` command again, it will update
    all related stuff for you. And you can open the `build/CMakeCache.txt` to
    check updated settings in most cases (but some `CMAKE_` env vars don't
    show in there).

    - If you want a clean update (to make sure everything works fine), then
    just remove the `build` folder and re-create again and re-run `cmake` again.

    </br>

### 2. How to use `cmake`

Print all supported targets in `build/Makefile`

```bash
cd build

make help
# The following are some of the valid targets for this Makefile:
# ... all (the default if no target is provided)
# ... clean
# ... depend
# ... edit_cache
# ... install
# ... install/local
# ... install/strip
# ... list_install_components
# ... rebuild_cache
# ... c_demo
# ... c_demo_need_lib
# ... c_demo_pointer
# ... c_demo_string
# ... c_demo_struct
# ... demo_utils
```

</br>

So, you can run:

- `make clean` to clean all object files

- `make` or `make all` to build all targets

- `make TARGET_NAME` to build the particular executable. e.g. `make main_need_lib`

- `make install` to install configured targets

</br>


### 3. Sample `CMakeLists.txt`

```cmake
cmake_minimum_required(VERSION "3.22")

set(CMAKE_SYSTEM_PROCESSOR x86_64)


# -----------------------------------------------------------------------------
# Define project name. After this, we can use "${PROJECT_NAME}" var to 
# dereference/re-use the project name as a String value.
#
# More details from here:
# https://cmake.org/cmake/help/v3.0/command/project.html?highlight=project
# -----------------------------------------------------------------------------
project("c_demo" LANGUAGES C)


# -----------------------------------------------------------------------------
# Enable verbose makefile
# -----------------------------------------------------------------------------
set(CMAKE_VERBOSE_MAKEFILE TRUE)



# -----------------------------------------------------------------------------
# Because the build target (`${PROJECT_NAME}_need_lib`) needs to search dynamic
# lib (`${UTILS_LIBRARY_NAME}`) in the correct runtime path (`RPATH`) and it's
# located in a non-stanard system lib folder. That's why you should have the
# following `set()` settings.
#
# It tells `${CMAKE_INSTALL_PREFIX}/bin/c_demo_need_lib` executable that plz go
# to `${CMAKE_INSTALL_PREFIX}/lib/demo` folder to find the
# `lib${UTILS_LIBRARY_NAME}.so` dynamic libraray!!!
#
# Otherwise, you will see the following info when running `make install`:
#
#  `-- Set runtime path of "/usr/local/bin/c_demo_need_lib" to ""`
#
# And that causes `${CMAKE_INSTALL_PREFIX}/bin/c_demo_need_lib` fails to run,
# as it doesn't know where to find the `lib${UTILS_LIBRARY_NAME}.so`!!!
#
# The correct settings output should be:
#
# `-- Set runtime path of "/usr/local/bin/c_demo_need_lib" to "/usr/local/lib/demo"`
#
#
# Pay attention very carefully:
#
# The following settings HAVE TO place before any `add_executable`, or it won't
# work at all!!!
#
# -----------------------------------------------------------------------------

# Don't skip the full RPATH (runtime path) for the build tree, default behavior
set(CMAKE_SKIP_BUILD_RPATH FALSE)

# when building, don't use the install RPATH already
set(CMAKE_BUILD_WITH_INSTALL_RPATH FALSE)

# Set the install RPATH, this is the key part
set(CMAKE_INSTALL_RPATH "${CMAKE_INSTALL_PREFIX}/lib/demo")

# Add the automatically determined parts of the RPATH which point to directories
# outside the build tree to the install RPATH
set(CMAKE_INSTALL_RPATH_USE_LINK_PATH TRUE)


# -----------------------------------------------------------------------------
# Compile the particular source code as a static/dynamic library
#
# - static lib:  lib${LIBRARY_NAME}.a
# - dynamic lib: lib${LIBRARY_NAME}.so
#
# `add_library`: Adds a library target called <name> to be built from the source
#                files listed in the command invocation
#
# syntax: add_library(<name> [STATIC | SHARED | MODULE]
#           [EXCLUDE_FROM_ALL]
#           source1 [source2 ...])
#
# More details from here:
# https://cmake.org/cmake/help/v3.0/command/add_library.html?highlight=add_library
# -----------------------------------------------------------------------------
set(UTILS_LIBRARY_NAME "demo_utils")
set(UTILS_LIBRARY_SOURCE_FILE "src/utils/lib.c")
set(UTILS_LIBRARY_HEADER_FILE "src/utils/lib.h")
add_library("${UTILS_LIBRARY_NAME}" SHARED "${UTILS_LIBRARY_SOURCE_FILE}")
#add_library("${UTILS_LIBRARY_NAME}" STATIC "${UTILS_LIBRARY_SOURCE_FILE}")


# -----------------------------------------------------------------------------
# Compile and build executable
#
# `add_executable`: Adds an executable target called <name> to be built from the
#                   source files listed in the command invocation.
#
# syntax: add_executable(<name> [WIN32] [MACOSX_BUNDLE]
#              [EXCLUDE_FROM_ALL]
#              source1 [source2 ...])
#
# More details from here:
# https://cmake.org/cmake/help/v3.0/command/add_executable.html?highlight=add_executable
# -----------------------------------------------------------------------------
add_executable("${PROJECT_NAME}" "src/main.c")
add_executable("${PROJECT_NAME}_string" "src/string_demo.c")
add_executable("${PROJECT_NAME}_struct" "src/struct_demo.c")
add_executable("${PROJECT_NAME}_pointer" "src/pointer_demo.c")
add_executable("${PROJECT_NAME}_need_lib" "src/main_need_lib.c")


# -----------------------------------------------------------------------------
# Conditional compilation, it's equal to add a `#define MACRO_NAME` in your
# project source file.
#
# `target_compile_definitions`: Specify compile definitions to use when
#                               compiling a given <target. The named <target>
#                               must have been created by a command such as
#                               `add_executable()` or `add_library()` and must
#                               not be an Imported Target.
#
# syntax: target_compile_definitions(<target>
#           <INTERFACE|PUBLIC|PRIVATE> [items1...]
#           [<INTERFACE|PUBLIC|PRIVATE> [items2...] ...])
#
# `PUBLIC` or `INTERFACE` publishes the compile definitions required to compile
# against the `headers` for the target.
#
# More details from here:
# https://cmake.org/cmake/help/v3.0/command/target_compile_definitions.html?highlight=target_compile_de
# -----------------------------------------------------------------------------
# target_compile_definitions("${PROJECT_NAME}_debug_version" PRIVATE ENABLE_DEBUG)


# -----------------------------------------------------------------------------
# Linker flag for creating static link executable, it will static link the `glic`
# or `musl` to generate a single independent binary.
#
# 1. For the `musl` build, you should enable this. Otherwise, when you run the
#    executable in `Alpine`, it will complain that missing the
#    `/lib/ld-musl-aarch64.so.1` library.
#
# 2. It won't work if `add_library` with `SHARED` flag, as that's not make sense!!!
# -----------------------------------------------------------------------------
# set(CMAKE_EXE_LINKER_FLAGS " -static")


# -----------------------------------------------------------------------------
# Link the particular library to the executable we build
#
# `target_link_libraries`: Specify libraries or flags to use when linking a given
#                          target. ~The named <target> must have been created in
#                          the current directory by a command such as
#                          `add_executable()` or `add_library()`. The remaining
#                          arguments specify library names or flags.
#
#                          Repeated calls for the same <target> append items in
#                          the order called.
#
# syntax: target_link_libraries(<target> [item1 [item2 [...]]]
#           [[debug|optimized|general] <item>] ...)
#
# More details from here:
# https://cmake.org/cmake/help/v3.0/command/target_link_libraries.html?highlight=target_link_libraries
# -----------------------------------------------------------------------------
target_link_libraries("${PROJECT_NAME}_need_lib" "${UTILS_LIBRARY_NAME}")


# -----------------------------------------------------------------------------
# The settings below just copy the target into different output folder
#
# By default, `make install` copies all targets to `/usr/local` which means:
#
# /usr/local/bin
# /usr/local/lib
# /usr/local/include
#
# Of course, you can change it by running `cmake` like below if you want:
#
# `cmake .. -DCMAKE_INSTALL_PREFIX=/cpp/build`
#
#  After that, `make install` copies all targets to:
#
# /cpp/build/bin
# /cpp/build/lib
# /cpp/build/include
#
#
# syntax: install(TARGETS targets... [EXPORT <export-name>]
#       [[ARCHIVE|LIBRARY|RUNTIME|FRAMEWORK|BUNDLE|
#         PRIVATE_HEADER|PUBLIC_HEADER|RESOURCE]
#        [DESTINATION <dir>]
#        [INCLUDES DESTINATION [<dir> ...]]
#        [PERMISSIONS permissions...]
#        [CONFIGURATIONS [Debug|Release|...]]
#        [COMPONENT <component>]
#        [OPTIONAL] [NAMELINK_ONLY|NAMELINK_SKIP]
#       ] [...]) 
#
#       `Executables` are treated as `RUNTIME` targets
#
# More details from here:
# https://cmake.org/cmake/help/v3.0/command/install.html?highlight=install
# -----------------------------------------------------------------------------
install(TARGETS "${UTILS_LIBRARY_NAME}" "${PROJECT_NAME}_need_lib"
    RUNTIME DESTINATION bin
    LIBRARY DESTINATION lib/demo)

install(FILES  "${UTILS_LIBRARY_HEADER_FILE}" DESTINATION include/demo)


# -----------------------------------------------------------------------------
# Print out cmake vars for debugging `MakeLists.txt` purpose
# -----------------------------------------------------------------------------
message(">>> CMAKE_SYSTEM_NAME: ${CMAKE_SYSTEM_NAME}")
message(">>> CMAKE_BUILD_TYPE: ${CMAKE_BUILD_TYPE}")
message(">>> CMAKE_C_COMPILER: ${CMAKE_C_COMPILER}")
message(">>> CMAKE_C_FLAGS: ${CMAKE_C_FLAGS}")
message(">>> CMAKE_C_FLAGS_DEBUG: ${CMAKE_C_FLAGS_DEBUG}")
message(">>> CMAKE_C_FLAGS_RELEASE: ${CMAKE_C_FLAGS_RELEASE}")
```

</br>


